var Sequence = require("../models/sequence");

class SequenceGenerator {
  constructor() {
    this.maxPersonId = 0;
    this.sequenceId = null;
  }

  async init() {
    try {
      const sequence = await Sequence.findOne().exec();
      this.sequenceId = sequence._id;
      this.maxPersonId = sequence.maxPersonId;
    } catch (err) {
      throw err;
    }
  }

  async nextId(collectionType) {
    let updateObject = {};
    let nextId;

    switch (collectionType) {
      case "people":
        this.maxPersonId++;
        updateObject = { maxPersonId: this.maxPersonId };
        nextId = this.maxPersonId;
        break;
      default:
        return Promise.reject("Invalid collection type");
    }

    try {
      await Sequence.updateOne(
        { _id: this.sequenceId },
        { $set: updateObject }
      );
      return nextId;
    } catch (err) {
      throw err; // Propagate error if the update fails
    }
  }
}

module.exports = new SequenceGenerator();
