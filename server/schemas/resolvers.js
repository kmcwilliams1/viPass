const { AuthenticationError } = require("apollo-server-express");
const { User, Permissions, Tier, Event } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("permissions");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("events");
    },
    permissions: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Permissions.find(params).sort({ createdAt: -1 }).populate("tier");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("events")
          .populate({ path: "events", populate: "tiers" })
          .populate({ path: "user.events.tiers", populate: "permissions" });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    admins: async (parent, args, context) => {
      if (context.user.isAdmin) {
        return User.find({ isAdmin: true }).populate("events");
      }
      throw new AuthenticationError(
        "You need to be an admin to see other admins!"
      );
    },
    tiers: async (parent, args, context) => {
      return Tier.find().populate("permissions").populate("users");
    },
    events: async (parent, args, context) => {
      return Event.find().populate("tiers").populate({
        path: "tiers",
        populate: "permissions",
      });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    makeAdmin: async (parent, { userId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (context.user.isAdmin) {
        const newAdmin = await User.findOneAndUpdate(
          { username: username },
          { $set: { isAdmin: true } },
          { new: true }
        );
        return newAdmin;
      }
      throw new AuthenticationError("You need to be an admin!");
    },
    removeAdmin: async (parent, { userId }, context) => {
      if (context.user.isAdmin) {
        const deleteAdmin = await User.findByIdAndUpdate(
          { _id: userId },
          { $set: { isAdmin: false } },
          { new: true }
        );
        return deleteAdmin;
      }
    },
      addPermissiontoTier: async (parent, { accessArea, tierName }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (context.user.isAdmin) {
        const permissions = await Permissions.create({
          accessArea,
          accessCreator: context.user.username,
        });

        await Tier.findOneAndUpdate(
          { tierName: tierName },
          { $addToSet: { permissions: permissions._id } }
        );
        return permissions;
      }
      throw new AuthenticationError("You need to be an admin!");
    },
    addPermission: async (parent, { accessArea }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (context.user.isAdmin) {
        const permissions = await Permissions.create({
          accessArea,
          accessCreator: context.user.username,
        });
        return permissions;
      }
      throw new AuthenticationError("You need to be an admin!");
    },
    removePermission: async (parent, { permissionId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (context.user.isAdmin) {
        const permissions = await Permissions.findOneAndDelete({
          _id: permissionId,
        });
        return permissions;
      }
      throw new AuthenticationError(
        "You need to be an admin to remove permissions!"
      );
    },
    addTierToEvent: async (parent, { tierName, name }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (context.user.isAdmin) {
        const tier = await Tier.create({
          tierName,
        });

        await Event.findOneAndUpdate(
          { name: name },
          { $addToSet: { tier: tier._id } }
        );
        return tier;
      }
      throw new AuthenticationError("You need to be an admin!");
    },
    addTier: async (parent, { tierName }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (context.user.isAdmin) {
        const tiers = await Tier.create({
          tierName: tierName
        });
        return tiers;
      }
      throw new AuthenticationError(
        "You need to be an admin to remove permissions!"
      );
    },
    removeTier: async (parent, { tierId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (context.user.isAdmin) {
        const tiers = await Tier.findOneAndDelete({
          _id: tierId,
        });
        return tiers;
      }
      throw new AuthenticationError(
        "You need to be an admin to remove permissions!"
      );
    },
    addEvent: async (parent, { name }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (context.user.isAdmin) {
        const events = await Event.create({
          name: name
        });
        return events;
      }
      throw new AuthenticationError("You need to be an admin!");
    },
    removeEvent: async (parent, { eventId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (context.user.isAdmin) {
        const events = await Event.findOneAndDelete({
          _id: eventId,
        });
        return events;
      }
      throw new AuthenticationError(
        "You need to be an admin to remove permissions!"
      );
    },
  },
};

module.exports = resolvers;
