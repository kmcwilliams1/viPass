const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const permissionsSchema = new Schema({
  accessEvent: {
    type: String,
    required: "You need to add a permissions event or location!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
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
  accessTier: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  accessLevel: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
});

const Permissions = model("Permissions", permissionsSchema);

module.exports = Permissions;
