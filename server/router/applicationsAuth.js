const express = require("express");
const router = express.Router();
const session = require("express-session");
const db = add url here
const Applications = require("../model/applicationSchema");

const requireLogin = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/login");
    console.log("hello require");
  } else {
    next();
  }
};

// Post application
router.post("/application-form", async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      dob,
      age,
      gender,
      address,
      country,
      adharCard,
      bankName,
      accountNumber,
      branch,
      income,
      incomeProof,
      collegeName,
      uid,
      collegeEmail,
      degree,
      cgpa,
      achievements,
      extracurricular,
      lor,
      certificates,
      scholarshipName,
      amount,
      category,
    } = req.body;

    if (
      (!name,
      !mobile,
      !email,
      !dob,
      !age,
      !gender,
      !address,
      !country,
      !adharCard,
      !bankName,
      !accountNumber,
      !branch,
      !income,
      //   !incomeProof,
      !collegeName,
      !uid,
      !collegeEmail,
      !degree,
      !cgpa,
      achievements,
      extracurricular,
      lor,
      certificates,
      !scholarshipName,
      !amount,
      !category)
    ) {
      return res
        .status(422)
        .send({ success: false, message: "Please fill all the input fields" });
    }

    const dateObj = new Date(dob);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDateStr = dateObj.toLocaleDateString("en-US", options);
    // check Existing scholarship
    const ApplicationExist = await Applications.findOne({
      name,
      scholarshipName,
      category,
    });
    if (ApplicationExist) {
      return res
        .status(200)
        .send({ success: false, message: "This Application already exists" });
    }

    const application = new Applications({
      name,
      mobile,
      email,
      dob: formattedDateStr,
      age,
      gender,
      address,
      country,
      adharCard,
      bankName,
      accountNumber,
      branch,
      income,
      incomeProof,
      collegeName,
      uid,
      collegeEmail,
      degree,
      cgpa,
      achievements,
      extracurricular,
      lor,
      certificates,
      scholarshipName,
      amount,
      category,
    });
    const applicationRegister = await application.save();

    if (applicationRegister) {
      return res.status(201).send({
        success: true,
        message: "Application added Successfully",
        applicationRegister,
      });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({
      success: false,
      message: "Error ",
      error,
    });
  }
});

// Get all applications
router.get("/get-applications", async (req, res) => {
  try {
    const application = await Applications.find({
      status: { $nin: ["Accepted", "Rejected"] },
    }).sort({ timestamp: "-1" });
    res.status(200).send({
      success: true,
      message: "All Applications",
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Details",
      error,
    });
  }
});
// Get all accepted/rejected applications 
router.get("/get-previous-applications", async (req, res) => {
  try {
    const application = await Applications.find({
      status: { $in: ["Accepted", "Rejected"] },
    }).sort({ timestamp: "-1" });
    res.status(200).send({
      success: true,
      message: "All Previous Applications",
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Details",
      error,
    });
  }
});

// Get single Application information
router.get("/get-applications/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const application = await Applications.findById(_id);
    if (!application) {
      return res.status(404).send("Application not found");
    } else {
      res.status(200).send({
        success: true,
        message: "Application",
        application,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Details",
      error,
    });
  }
});

// Delete one Application
router.delete("/get-applications/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteApplication = await Applications.findByIdAndDelete(_id);
    if (!deleteApplication) {
      return res.status(404).send("This application is not available");
    } else {
      res.status(200).send({
        success: true,
        message: "Application Deleted",
        deleteApplication,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting",
      error,
    });
  }
});

// Update Application information
router.put("/get-applications/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateApplication = await Applications.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateApplication) {
      return res.status(404).send("This application is not available");
    } else {
      res.status(200).send({
        success: true,
        message: "Application Updated",
        updateApplication,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating",
      error,
    });
  }
});

// get appliations of a single user:
router.get("/get-user-applications/:userEmail", async (req, res) => {
  try {
    const email = req.params.userEmail;
    const application = await Applications.find({ email }).sort({
      timestamp: "-1",
    });
    if (!application) {
      return res.status(404).send("Application not found");
    } else {
      res.status(200).send({
        success: true,
        message: "Application",
        application,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Details",
      error,
    });
  }
});

// Updating Status of the Application
router.put("/set-status/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const status = req.body.status;
    const reason = req.body.reason;
    const updateApplication = await Applications.findByIdAndUpdate(
      _id,
      { status , reason},
      {
        new: true,
      }
    );
    if (!updateApplication) {
      return res.status(404).send("This application is not available");
    } else {
      res.status(200).send({
        success: true,
        message: "Application Status Updated",
        updateApplication,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating",
      error,
    });
  }
});

module.exports = router;
