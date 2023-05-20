const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser);
app.use(
  session({
    secret: "tcet",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set secure to true if using HTTPS
  })
);
const db ="mongodb+srv://adminmayank:amanmayank@cluster0.8swhukd.mongodb.net/?retryWrites=true&w=majority"


mongoose
  .connect(db)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log("error : ", err));

app.use(express.json());
app.use(cors());
// User
const User = require("./model/userSchemaa");
app.use(require("./router/auth.js"));
// Admin
const Admin = require("./model/adminSchema.js");
app.use(require("./router/adminAuth.js"));
// Scholarship
const Scholarships = require("./model/scholarshipModel.js");
app.use(require("./router/scholarshipAuth.js"));
// Application
const Applications = require("./model/applicationSchema.js");
app.use(require("./router/applicationsAuth.js"));

// Middleware
const middleware = (req, res, next) => {
  console.log("hello middleware");
  next();
};

const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
    console.log("Login require");
  } else {
    next();
  }
};



// middleware();

app.listen(8080, () => {
  console.log("Server is running at port 8080");
});

console.log("ok");
