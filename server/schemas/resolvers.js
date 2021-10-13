const { AuthenticationError } = require("apollo-server-express");
const { User, Permissions } = require("../models");
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
      return Permissions.find(params).sort({ createdAt: -1 });
    },
    // permissions: async (parent, { permissionId }) => {
    //   return Permissions.findOne({ _id: permissionId });
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("permissions");
      }
      throw new AuthenticationError("You need to be logged in!");
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
    removePermission: async (parent, { permissionId }, context) => {
      if (context.user) {
        const permissions = await Permissions.findOneAndDelete({
          _id: permissionId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { permissions: permissions._id } }
        );

        return permissions;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
