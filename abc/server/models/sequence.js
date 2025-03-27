const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  maxPersonId: { type: Number, required: true },
});

module.exports = mongoose.model("Sequence", sequenceSchema);
