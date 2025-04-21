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
    const vets = await Vet.find({ isDeleted: { $ne: true } }); // استبعاد المحذوفين
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching vets",
      error: error.message,
    });
  }
};

// Controller to get vets by department
const getVetsByDepartment = async (req, res) => {
  const { departmentId } = req.params;

  try {
    const vets = await Vet.find({
      department: departmentId,
      isDeleted: { $ne: true }, // استبعاد المحذوفين
    });

    res.status(200).json(vets);
  } catch (error) {
    console.error("Error fetching vets:", error);
    res.status(500).json({
      message: "Error fetching vets",
      error: error.message,
    });
  }
};

const deleteVet = async (req, res) => {
  try {
    const { vetName } = req.params;

    // بدلاً من الحذف، نقوم بتحديث الحقل isDeleted إلى true
    const result = await Vet.updateOne(
      { name: vetName },
      { $set: { isDeleted: true } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Veterinarian ${vetName} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Veterinarian ${vetName} marked as deleted`,
    });
  } catch (error) {
    console.error("Error soft deleting vet:", error);
    res.status(500).json({
      success: false,
      message: "Error soft deleting veterinarian",
    });
  }
};

module.exports = {
  addVet,
  getVets,
  getVetsByDepartment,
  deleteVet,
};
