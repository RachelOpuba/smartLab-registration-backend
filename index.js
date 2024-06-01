const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const PORT = 5000;
const Student = require("./models/studentSchema");

const app = express();

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from Node API again and again");
});

function generateCouponCode() {
  return 'C' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

app.post("/api/student", async (req, res) => {
  try {
    const couponCode = generateCouponCode();
    const studentData = {
      ...req.body,
      couponCode: couponCode
    };
    const student = await Student.create(studentData);
    res.status(200).json({ message: "Student added successfully", student: student });

    // Send the registration email with the coupon code
    const { email, firstName, lastName, planName } = studentData;
    const mailOptions = {
      from: 'rachelsmartlab@gmail.com',
      to: email,
      subject: 'Registration Confirmation',
      text: `Hello ${firstName} ${lastName},

        Thank you for registering for the ${planName} plan.

        We have received your payment and your registration is confirmed.

        Your unique coupon code is: ${couponCode}

        Best regards,
        SmartLab`
            };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });
    if (student) {
      return res.status(200).json({ exists: true, message: "Email already registered" });
    }
    res.status(200).json({ exists: false, message: "Email not registered" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find(res.body);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const updatedStudent = await Student.findById(id);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kelasmartlab@gmail.com',
    pass: 'clbi zoxu xngk lwhw', // Ensure you have the correct password or app-specific password here
  },
});

app.post('/api/send-email', (req, res) => {
  const { email, firstName, lastName, planName, couponCode } = req.body;

  const mailOptions = {
    from: 'rachelsmartlab@gmail.com',
    to: email,
    subject: 'Registration Confirmation',
    text: `Hello ${firstName} ${lastName},

Thank you for registering for the ${planName} plan.

We have received your payment and your registration is confirmed.

Your unique coupon code is: ${couponCode}

Best regards,
SmartLab`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

mongoose
  .connect(
    "mongodb+srv://smartlab:BZxePeg6N0osDufw@cluster0.unepvpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server Started at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err)
    console.log("Connection failed");
  });
