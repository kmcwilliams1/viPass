const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const permissionsSchema = new Schema({
  accessArea: {
    type: String,
    required: "You need to add an area for access!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  accessCreator: {
    type: String,
    required: "You need a permission creator.",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
});

const Permissions = model("Permissions", permissionsSchema);

module.exports = Permissions;
