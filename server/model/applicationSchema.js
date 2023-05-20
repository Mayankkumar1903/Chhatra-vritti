const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  scholarshipName: {
    type: String,
    //require: true
  },
  amount: {
    type: Number,
    //require: true
  },
  category: {
    type: String,
    //require: true
  },
  name: {
    type: String,
    //require: true
  },
  mobile: {
    type: Number,
    //require: true
  },
  email: {
    type: String,
    //require : true
  },
  dob: {
    type: String,
    //require: true
  },
  age: {
    type: Number,
    //require:true
  },
  gender: {
    type: String,
    //require: true
  },
  address: {
    type: String,
    //require: true
  },
  country: {
    type: String,
    //require: true
  },
  adharCard: {
    type: String,
    //require: true
  },
  bankName: {
    type: String,
    //require: true
  },
  accountNumber: {
    type: Number,
    //require: true
  },
  branch: {
    type: String,
    //require: true
  },
  income: {
    type: Number,
    //require: true
  },
  incomeProof: {
    data: Buffer,
    contentType: String,
    //require: true
  },
  collegeName: {
    type: String,
    //require: true
  },
  uid: {
    type: String,
    //require: true
  },
  collegeEmail: {
    type: String,
    //require: true
  },
  degree: {
    type: String,
    //require: true
  },
  cgpa: {
    type: Number,
    //require: true
  },
  achievements: {
    type: String,
  },
  extracurricular: {
    type: String,
  },
  lor: {
    data: Buffer,
    contentType: String,
  },
  certificates: {
    data: Buffer,
    contentType: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Under Process', 'Accepted', 'Rejected'],
    default: "Under Process",
  },
  reason: {
    type: String
  }
});

const Applications = mongoose.model("applications", applicationSchema);

module.exports = Applications;
