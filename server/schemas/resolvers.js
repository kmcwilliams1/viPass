const { AuthenticationError } = require('apollo-server-express');
const { User, Permission } = require('../models');
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
      return Permission.find(params).sort({ createdAt: -1 });
    },
    permission: async (parent, { permissionId }) => {
      return Permission.findOne({ _id: permissionId });
    },
    // permissions: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Thought.find(params).sort({ createdAt: -1 });
    // },
    // permission: async (parent, { permissionId }) => {
    //   return Thought.findOne({ _id: permissionId });
    // },
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
        const permission = await Permission.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { permissions: permission._id } }
        );

        return permission;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { permissionId, commentText }, context) => {
      if (context.user) {
        return Permission.findOneAndUpdate(
          { _id: permissionId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePermission: async (parent, { permissionId }, context) => {
      if (context.user) {
        const permission = await Permission.findOneAndDelete({
          _id: permissionId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { permissions: permission._id } }
        );

        return permission;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { permissionId, commentId }, context) => {
      if (context.user) {
        return Permission.findOneAndUpdate(
          { _id: permissionId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
        console.log(user);
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};
//     addPermission: async (parent, { thoughtText }, context) => {
//       if (context.user) {
//         const permission = await Thought.create({
//           thoughtText,
//           thoughtAuthor: context.user.username,
//         });

//         await User.findOneAndUpdate(
//           { _id: context.user._id },
//           { $addToSet: { permissions: permission._id } }
//         );

//         return permission;
//       }
//       throw new AuthenticationError("You need to be logged in!");
//     },
//     addComment: async (parent, { permissionId, commentText }, context) => {
//       if (context.user) {
//         return Thought.findOneAndUpdate(
//           { _id: permissionId },
//           {
//             $addToSet: {
//               comments: { commentText, commentAuthor: context.user.username },
//             },
//           },
//           {
//             new: true,
//             runValidators: true,
//           }
//         );
//       }
//       throw new AuthenticationError("You need to be logged in!");
//     },
//     removePermission: async (parent, { permissionId }, context) => {
//       if (context.user) {
//         const permission = await Thought.findOneAndDelete({
//           _id: permissionId,
//           thoughtAuthor: context.user.username,
//         });

//         await User.findOneAndUpdate(
//           { _id: context.user._id },
//           { $pull: { permissions: permission._id } }
//         );

//         return permission;
//       }
//       throw new AuthenticationError("You need to be logged in!");
//     },
//     removeComment: async (parent, { permissionId, commentId }, context) => {
//       if (context.user) {
//         return Thought.findOneAndUpdate(
//           { _id: permissionId },
//           {
//             $pull: {
//               comments: {
//                 _id: commentId,
//                 commentAuthor: context.user.username,
//               },
//             },
//           },
//           { new: true }
//         );
//       }
//       throw new AuthenticationError("You need to be logged in!");
//     },
//   },
// };

module.exports = resolvers;
