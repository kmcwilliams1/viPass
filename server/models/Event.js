const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const eventSchema = new Schema({
  name: {
    type: String,
    required: "You need to add an event name!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  tiers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tier",
    },
  ],
});

const Event = model("Event", eventSchema);

module.exports = Event;
