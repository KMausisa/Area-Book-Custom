var express = require("express");
var router = express.Router();

const sequenceGenerator = require("./sequenceGenerator");
const Person = require("../models/person");

router.get("/", (req, res, next) => {
  Person.find()
    .then((people) => {
      return res
        .status(200)
        .json({ message: "People retrieved successfully", data: people });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Error retrieving people",
        error: err,
      });
    });
});

router.post("/", async (req, res, next) => {
  // Validate required fields
  if (!req.body.name || !req.body.phone || !req.body.address) {
    return res.status(400).json({
      message: "Name, Phone, and Address are required fields.",
    });
  }

  await sequenceGenerator.init();

  const maxPersonId = await sequenceGenerator.nextId("people");

  const person = new Person({
    id: maxPersonId.toString(),
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    notes: req.body.notes,
    household: req.body.household,
  });

  person
    .save()
    .then((createdPerson) => {
      res.status(201).json({
        message: "Person added successfully",
        person: createdPerson,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

module.exports = router;
