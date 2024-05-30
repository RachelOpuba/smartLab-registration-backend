const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT =  5000
const Student = require("./models/studentSchema");

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from Node API again and again");
});

 
app.post("/api/student", async (req, res) => {
  try {
    
    const student = await Student.create(req.body);
    res.status(200).json({message: "Student added successfully" , student: student});
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
    res.status(200).json({ message: "Student deleted Successfylly" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
    console.log("Connection falled");
  });
