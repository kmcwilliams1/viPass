const { AuthenticationError } = require('apollo-server-express');
const { User, Permissions } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('permissions');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('permissions');
    },
    permissions: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Permissions.find(params).sort({ createdAt: -1 });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('permissions');
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
    addPermission: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const permissions = await Permissions.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToet: { permissions: permissions._id } }
        );

        return permissions;
      }
      throw new AuthenticationError('You need to be logged in!');
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
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
