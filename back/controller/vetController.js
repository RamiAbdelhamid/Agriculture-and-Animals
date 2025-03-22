const Vet = require("../model/Vet");

// Controller to add a new veterinarian
const addVet = async (req, res) => {
  const { name, department, experience, rating, reviewCount, specializations } =
    req.body;

  try {
    const newVet = new Vet({
      name,
      department,
      experience,
      rating,
      reviewCount,
      specializations,
    });

    await newVet.save();
    res.status(201).json({ message: "Vet added successfully", vet: newVet });
  } catch (error) {
    res.status(500).json({ message: "Error adding vet", error: error.message });
  }
};

// Controller to get all veterinarians
const getVets = async (req, res) => {
  try {
    const vets = await Vet.find(); // Fetch all vets from the database
    res.status(200).json(vets); // Return the list of vets as JSON
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching vets", error: error.message });
  }
};

// Controller to get vets by department
const getVetsByDepartment = async (req, res) => {
  const { departmentId } = req.params;

  try {
    const vets = await Vet.find({ department: departmentId });
    res.status(200).json(vets);
  } catch (error) {
    console.error("Error fetching vets:", error);
    res.status(500).json({ message: "Error fetching vets" });
  }
};



module.exports = {
  addVet,
  getVets,
  getVetsByDepartment,
};
