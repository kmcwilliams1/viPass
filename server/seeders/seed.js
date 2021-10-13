<<<<<<< HEAD
const db = require('../config/connection');
const { User, Permission } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');
=======
const db = require("../config/connection");
const { User } = require("../models");
const userSeeds = require("./userSeeds.json");
const permissionSeeds = require("./permissionSeeds.json");
>>>>>>> 3340a67c3cf11d54b4cbb27f94ef9841ac42f2a8

db.once("open", async () => {
  try {
<<<<<<< HEAD
    await Permission.deleteMany({});
=======
>>>>>>> 3340a67c3cf11d54b4cbb27f94ef9841ac42f2a8
    await User.deleteMany({});

    await User.create(userSeeds);

<<<<<<< HEAD
    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Permission.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            permissions: _id,
          },
        }
      );
    }
=======
    // for (let i = 0; i < thoughtSeeds.length; i++) {
    //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     {
    //       $addToSet: {
    //         permissions: _id,
    //       },
    //     }
    //   );
>>>>>>> 3340a67c3cf11d54b4cbb27f94ef9841ac42f2a8
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
