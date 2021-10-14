const db = require("../config/connection");
const { User, Permissions } = require("../models");
const userSeeds = require("./userSeeds.json");
const permissionsSeeds = require("./permissionsSeeds.json");
const tierSeeds = require("./tierSeeds.json");

db.once("open", async () => {
  try {
    await Permissions.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < permissionsSeeds.length; i++) {
      const { _id, accessCreator } = await Permissions.create(
        permissionsSeeds[i]
      );
      const user = await User.findOneAndUpdate(
        { username: accessCreator },
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
