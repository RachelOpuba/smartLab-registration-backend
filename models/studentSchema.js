const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
    {
      firstName: {
        type: String,
        required: [true, "Please provide first name"],
      },

      lastName: {
        type: String,
        required: [true, "Please provide last name"],
      },

      email: {
        type: String,
        required: [true, "Please enter your email"],
      },
      
      coupon: {
        type: String,
      },

      amount: {
        type: Number,
        required: [true, "Please select a plan"],
      },

      gender: {
        type: String,
        required: [true, "Please select your gender"],
      },

      planName: {
        type: String,
        required: [true, "Please choose a plan"],
      },

      registerType: {
        type: String,
        required: [true, "Please select your registration type"],
      },
  
  
      telephone: {
        type: String,
        required: true,
      },
      couponCode: {
        type: String,
       
      },
    },
  
    {
      timestamps: true,
    }
  );

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
