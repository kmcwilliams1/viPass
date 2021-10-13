const db = require('../config/connection');
const { User, Permissions } = require('../models');
const userSeeds = require('./userSeeds.json');
const permissionsSeed = require('./permissionsSeed.json');

db.once("open", async () => {
  try {
    await Permissions.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < permissionsSeed.length; i++) {
      const { _id, thoughtAuthor } = await Permissions.create(permissionsSeed[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            permissions: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
