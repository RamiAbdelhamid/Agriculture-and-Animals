const Article = require("../model/articleModel");

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error });
  }
};

// Add new article
exports.addArticle = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    console.log("Uploaded file:", req.file);

    const { title, body, author } = req.body;
    const imageUrl = req.file ? `/uploads/articles/${req.file.filename}` : "";

    const newArticle = new Article({ title, body, author, imageUrl });
    await newArticle.save();

    res.status(201).json({ message: "Article created", article: newArticle });
  } catch (err) {
    console.error("Add Article Error:", err); // استخدم err هنا
    res
      .status(500)
      .json({ message: "Error adding article", error: err.message }); // وهنا
  }
};





