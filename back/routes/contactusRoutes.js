const express = require("express");
const {
  addContact,
  getContact,
} = require("../controller/contactusController");


const router = express.Router();

// Route to add a new department
router.post("/add", addContact);

// Route to get all departments
router.get("/", getContact);

module.exports = router;
