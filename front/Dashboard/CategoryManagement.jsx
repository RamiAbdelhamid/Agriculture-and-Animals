import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, ArrowUpRight } from "lucide-react";

const CategoryManagement = () => {
  // قراءة البيانات من localStorage عند تحميل الصفحة
  const loadCategoriesFromLocalStorage = () => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  };

  // حفظ البيانات في localStorage كلما تم تغيير الفئات
  const saveCategoriesToLocalStorage = (categories) => {
    localStorage.setItem("categories", JSON.stringify(categories));
  };

  const [categories, setCategories] = useState(
    loadCategoriesFromLocalStorage()
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "🌱",
  });
  const [editCategory, setEditCategory] = useState(null);

  const icons = [
    "🌱",
    "🌿",
    "🌾",
    "🌻",
    "🌽",
    "🥕",
    "🥔",
    "🧪",
    "🔨",
    "💧",
    "🐄",
    "🐓",
    "🐖",
    "🐑",
    "🐛",
    "🌡️",
  ];

  const handleAddCategory = () => {
    const newCategoryWithId = {
      ...newCategory,
      id: Date.now(),
      productCount: 0,
    };
    const updatedCategories = [...categories, newCategoryWithId];
    setCategories(updatedCategories);
    saveCategoriesToLocalStorage(updatedCategories);
    setNewCategory({ name: "", description: "", icon: "🌱" });
    setIsAddModalOpen(false);
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setIsAddModalOpen(true);
  };

  const handleUpdateCategory = () => {
    const updatedCategories = categories.map((c) =>
      c.id === editCategory.id ? editCategory : c
    );
    setCategories(updatedCategories);
    saveCategoriesToLocalStorage(updatedCategories);
    setEditCategory(null);
    setIsAddModalOpen(false);
  };

  const handleDeleteCategory = (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const updatedCategories = categories.filter((c) => c.id !== id);
      setCategories(updatedCategories);
      saveCategoriesToLocalStorage(updatedCategories);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-600">
            Manage product categories for your farm
          </p>
        </div>
        <button
          onClick={() => {
            setEditCategory(null);
            setNewCategory({ name: "", description: "", icon: "🌱" });
            setIsAddModalOpen(true);
          }}
          className="bg-green-600 text-white p-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white shadow-lg rounded-md p-4">
            <div className="flex justify-between items-center">
              <span className="text-3xl">{category.icon}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-2">{category.name}</h3>
            <p className="text-gray-600 text-sm">{category.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-500">
                {category.productCount} Products
              </span>
              <button className="text-green-600 flex items-center space-x-1">
                <ArrowUpRight />
                <span>View Products</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full sm:w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editCategory ? "Edit Category" : "Add New Category"}
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700">Category Name</label>
              <input
                type="text"
                value={editCategory ? editCategory.name : newCategory.name}
                onChange={(e) => {
                  const value = e.target.value;
                  editCategory
                    ? setEditCategory({ ...editCategory, name: value })
                    : setNewCategory({ ...newCategory, name: value });
                }}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                value={
                  editCategory
                    ? editCategory.description
                    : newCategory.description
                }
                onChange={(e) => {
                  const value = e.target.value;
                  editCategory
                    ? setEditCategory({ ...editCategory, description: value })
                    : setNewCategory({ ...newCategory, description: value });
                }}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Icon</label>
              <select
                value={editCategory ? editCategory.icon : newCategory.icon}
                onChange={(e) => {
                  const value = e.target.value;
                  editCategory
                    ? setEditCategory({ ...editCategory, icon: value })
                    : setNewCategory({ ...newCategory, icon: value });
                }}
                className="mt-1 p-2 border rounded-md w-full"
              >
                {icons.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon} {icon}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={
                  editCategory ? handleUpdateCategory : handleAddCategory
                }
                className="bg-green-600 text-white p-2 rounded-md"
              >
                {editCategory ? "Update" : "Add"} Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
