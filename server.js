const express = require("express");
const mongoose = require("mongoose");
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
app.get("/", (req, res) => res.send("hello world!"));
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
