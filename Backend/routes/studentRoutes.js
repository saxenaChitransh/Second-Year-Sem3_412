const express = require('express');
const router = express.Router();

// In-memory array for storing student records
let students = [
  {
    id: 101,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    branch: "CSE",
    semester: 3,
    mobile: "9876543210"
  }
];

// Helper function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate 10-digit mobile number
const isValidMobile = (mobile) => {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(String(mobile));
};

// 1. GET all students
router.get('/', (req, res) => {
  res.json(students);
});

// 2. GET a single student by ID
router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// 3. POST - Add a new student
router.post('/', (req, res) => {
  const { id, name, email, branch, semester, mobile } = req.body;

  // Check required fields
  if (!id || !name || !email || !branch || !semester || !mobile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const parsedId = parseInt(id);
  const parsedSemester = parseInt(semester);

  // Check if Student ID is unique
  const existingStudent = students.find((s) => s.id === parsedId);
  if (existingStudent) {
    return res.status(400).json({ message: "Student ID must be unique" });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate semester (1 to 8)
  if (isNaN(parsedSemester) || parsedSemester < 1 || parsedSemester > 8) {
    return res.status(400).json({ message: "Semester must be between 1 and 8" });
  }

  // Validate mobile number (10 digits)
  if (!isValidMobile(mobile)) {
    return res.status(400).json({ message: "Mobile number must contain exactly 10 digits" });
  }

  // Create new student object
  const newStudent = {
    id: parsedId,
    name: name.trim(),
    email: email.trim(),
    branch: branch.trim(),
    semester: parsedSemester,
    mobile: String(mobile).trim()
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// 4. PUT - Update an existing student
router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, email, branch, semester, mobile } = req.body;

  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  // Check required fields
  if (!name || !email || !branch || !semester || !mobile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const parsedSemester = parseInt(semester);

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate semester (1 to 8)
  if (isNaN(parsedSemester) || parsedSemester < 1 || parsedSemester > 8) {
    return res.status(400).json({ message: "Semester must be between 1 and 8" });
  }

  // Validate mobile number (10 digits)
  if (!isValidMobile(mobile)) {
    return res.status(400).json({ message: "Mobile number must contain exactly 10 digits" });
  }

  // Update student fields (keeping id unchanged)
  students[studentIndex] = {
    ...students[studentIndex],
    name: name.trim(),
    email: email.trim(),
    branch: branch.trim(),
    semester: parsedSemester,
    mobile: String(mobile).trim()
  };

  res.json({
    message: "Student updated successfully",
    student: students[studentIndex]
  });
});

// 5. DELETE - Delete a student by ID
router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(studentIndex, 1);

  res.json({ message: "Student deleted successfully" });
});

module.exports = router;
