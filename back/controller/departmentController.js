const Department = require("../model/Department");

// Controller to add a new department
const addDepartment = async (req, res) => {
  const { id, name, icon } = req.body;

  try {
    const newDepartment = new Department({
      id,
      name,
      icon,
    });

    await newDepartment.save();
    res
      .status(201)
      .json({
        message: "Department added successfully",
        department: newDepartment,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding department", error: error.message });
  }
};

// Controller to get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching departments", error: error.message });
  }
};

// Controller to delete a department
const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findOneAndDelete({ id });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res
      .status(200)
      .json({ message: "Department deleted successfully", department });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting department", error: error.message });
  }
};









module.exports = {
  addDepartment,
  getDepartments,
  deleteDepartment,
};
