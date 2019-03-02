const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//DB config
const db = require("./config/keys.js").mongoURI;
//connect mongoDB
mongoose
  .connect(db)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

//use routes

const app = express();
app.use(passport.initialize());
require("./config/passport.js")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
