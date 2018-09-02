const express = require("express");
const router = express.Router();
//@route    api/users/test
//@desc     Tests the users route
//@access    Public
router.get("/test", (req, res) => res.json({ message: "user works" }));
module.exports = router;
