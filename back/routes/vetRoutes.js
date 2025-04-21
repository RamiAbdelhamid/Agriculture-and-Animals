const express = require("express");
const {
  addVet,
  getVets,
  getVetsByDepartment,
deleteVet,
} = require("../controller/vetController");

const router = express.Router();

// Route to add a new veterinarian
router.post("/add", addVet);

// Route to get all veterinarians
router.get("/", getVets);

// Route to get vets by department
router.get("/by-department/:departmentId", getVetsByDepartment);

// Add this new route for deleting vets
// In vetRoutes.js, change the route to:
router.patch("/:vetName", deleteVet);

// Keep the rest of your implementation the same

module.exports = router;
