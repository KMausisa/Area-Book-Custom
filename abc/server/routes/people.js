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

router.put("/:id", (req, res, next) => {
  Person.findOne({ id: req.params.id })
    .then((person) => {
      person.name = req.body.name;
      person.age = req.body.age;
      person.address = req.body.address;
      person.phone = req.body.phone;
      person.email = req.body.email;
      person.notes = req.body.notes;
      person.household = req.body.household;

      Person.updateOne({ id: req.params.id }, person)
        .then((result) => {
          res.status(204).json({
            message: "Person updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Document not found.",
        error: { document: "Document not found" },
      });
    });
});

module.exports = router;
