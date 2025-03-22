const express = require("express");
const {
  addVet,
  getVets,
  getVetsByDepartment,
} = require("../controller/vetController");

const router = express.Router();

// Route to add a new veterinarian
router.post("/add", addVet);

// Route to get all veterinarians
router.get("/", getVets); // New route to fetch all vets

router.get("/by-department/:departmentId", getVetsByDepartment);





module.exports = router;
