const router = require("express").Router();
const postRoutes = require("./books");

// Post routes
router.use("/books", postRoutes);

module.exports = router;
