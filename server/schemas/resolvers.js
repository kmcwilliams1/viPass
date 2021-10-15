const { AuthenticationError } = require("apollo-server-express");
const { User, Permissions, Tier } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("permissions");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("permissions");
    },
    permissions: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Permissions.find(params).sort({ createdAt: -1 }).populate("tier");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("permissions");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    admins: async (parent, args, context) => {
      if (context.user.isAdmin) {
        return User.find({ isAdmin: true }).populate("permissions");
      }
      throw new AuthenticationError(
        "You need to be an admin to see other admins!"
      );
    },
    tiers: async (parent, args, context) => {
      return Tier.find().populate("permissions").populate("users");
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
          { _id: userId },
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
    addPermission: async (
      parent,
      { accessEvent, accessArea, userId },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (context.user.isAdmin) {
        const permissions = await Permissions.create({
          accessEvent,
          accessArea,
          accessCreator: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { permissions: permissions._id } }
        );

        return permissions;
      }
      throw new AuthenticationError("You need to be an admin!");
    },
    removePermission: async (parent, { permissionId, userId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      if (context.user.isAdmin) {
        const permissions = await Permissions.findOneAndDelete({
          _id: permissionId,
        });

        await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { permissions: permissionsId } }
        );

        return permissions;
      }
      throw new AuthenticationError(
        "You need to be an admin to remove permissions!"
      );
    },
    addTier: async (parent, args, context) => {},
    removeTier: async (parent, args, context) => {},
  },
};

module.exports = resolvers;
