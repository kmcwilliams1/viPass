const db = require("../config/connection");
const { User, Permissions, Tier } = require("../models");
const userSeeds = require("./userSeeds.json");
const permissionsSeeds = require("./permissionsSeeds.json");
const tierSeeds = require("./tierSeeds.json");

db.once("open", async () => {
  try {
    await Permissions.deleteMany({});
    await User.deleteMany({});
    await Tier.deleteMany({});
    await User.create(userSeeds);

    const permissionsIDs = [];
    for (let i = 0; i < permissionsSeeds.length; i++) {
      const { _id, accessCreator } = await Permissions.create(
        permissionsSeeds[i]
      );
      permissionsIDs.push(_id);
      // const user = await User.findOneAndUpdate(
      //   { username: accessCreator },
      //   {
      //     $addToSet: {
      //       permissions: _id,
      //     },
      //   }
      // );
    }
    for (let i = 0; i < tierSeeds.length; i++) {
      let tier;
      if (tierSeeds[i].name === "Platinum") {
        tier = await Tier.create({
          ...tierSeeds[i],
          permissions: permissionsIDs,
        });
      } else if (tierSeeds[i].name === "Diamond") {
        tier = await Tier.create({
          ...tierSeeds[i],
          permissions: [permissionsIDs[0], permissionsIDs[2]],
        });
      } else {
        tier = await Tier.create({
          ...tierSeeds[i],
          permissions: [permissionsIDs[2]],
        });
      }

      if (i === 0) {
        const updatedUser = await User.updateMany(
          { isAdmin: false },
          { $set: { tier: tier._id } },
          { new: true }
        );
      }
    }

    // console.log(userSeeds);
    // for (let i = 0; i < userSeeds.length; i++) {
    //   return await User.findOneAndUpdate(
    //     {}
    //   );
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
