const mongoose = require("mongoose");

const personSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: false },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: false },
  notes: { type: String, required: false },
  household: [{ type: String, ref: "Person" }],
});

module.exports = mongoose.model("Person", personSchema);
