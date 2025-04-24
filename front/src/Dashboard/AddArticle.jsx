import React, { useState } from "react";
import axios from "axios";

const AddArticle = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    author: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("body", formData.body);
    data.append("author", formData.author);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/articles", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Article added successfully!");
      setFormData({ title: "", body: "", author: "" });
      setImageFile(null);
    } catch (err) {
      console.error("Add Article Error:", err);
      res
        .status(500)
        .json({ message: "Error adding article", error: err.message });
    }

  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        Add New Article
      </h2>
      {message && (
        <p className="mb-4 text-center text-sm text-gray-600">{message}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium">Body</label>
          <textarea
            name="body"
            rows="6"
            value={formData.body}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Article
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
