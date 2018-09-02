const express = require("express");
const router = express.Router();
//@route    api/posts/test
//@desc     Tests the posts route
//@access    Public
router.get("/test", (req, res) => res.json({ message: "Posts works" }));
module.exports = router;
