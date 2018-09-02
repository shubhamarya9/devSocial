const express = require("express");
const router = express.Router();
//@route    api/profile/test
//@desc     Tests the profile route
//@access    Public

router.get("/test", (req, res) => res.json({ message: "Profile works" }));
module.exports = router;
