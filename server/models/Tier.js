const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const tierSchema = new Schema({
  tierName: {
    type: String,
    required: "You need to add a tier name!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Permissions",
    },
  ],
});

const Tier = model("Tier", tierSchema);

module.exports = Tier;
