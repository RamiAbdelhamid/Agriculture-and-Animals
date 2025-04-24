const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAllArticles,
  addArticle,
} = require("../controller/articleController");

// إعداد التخزين
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/articles");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getAllArticles);
router.post("/", upload.single("image"), addArticle);

module.exports = router;
