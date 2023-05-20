const express = require("express");
const router = express.Router();
const session = require("express-session");
const db = add your url here
const Admin = require("../model/adminSchema");
const requireAdminLogin = async(req, res, next) => {
  try {
    if (req.session.isAdminLoggedIn) {
      // User is authenticated as an admin, so continue with the request
      next();
  }else {
    // User is not authenticated as an admin, so redirect to login page or show an error message
    res.status(401).send('Unauthorized access');
  }
} catch (error) {
    console.log(error);
  }
};


router.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid Email or Password" });
    } else {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(422).send({
          success: false,
          message: "Email not registered. Please Register.",
        });
      } else {
        if (req.body.password !== admin.password) {
          return res
            .status(422)
            .send({ success: false, message: "Invalid Email or Password" });
        }
        res.status(200).send({
          success: true,
          message: "Login Successful",
          user: { email: admin.email },
        });
        req.session.isAdminLoggedIn = true;
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: `Login Error : ${err}` });
  }
});

router.get('/admin-auth', requireAdminLogin , (req,res) => {
  res.status(200).send({ok:true})
}) 

module.exports = router;
