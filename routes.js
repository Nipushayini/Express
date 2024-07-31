const express = require('express');
const router = express.Router();

// Sample employee data (consider using a database for persistence)
const employees = [
  { id: 1, name: 'John', course: 'Technology', roll_no: '101' },
  { id: 2, name: 'Kamal', course: 'Engineering', roll_no: '102' },
];

// Middleware (consider using a separate middleware file)
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// GET all employees (Read)
router.get('/', (req, res) => {
  res.json(employees);
});

// GET a single employee record (Read)
router.get('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === employeeId);

  if (!employee) {
    return res.status(404).send('Employee not found');
  }

  res.json(employee);
});

// POST a new employee record (Create)
router.post('/', (req, res) => {
  const { name, course, roll_no } = req.body;

  if (!name || !course || !roll_no) {
    return res.status(400).send('Missing required fields: name, course, roll_no');
  }

  const newEmployee = {
    id: employees.length + 1,
    name,
    course,
    roll_no,
  };

  employees.push(newEmployee);
  res.status(201).send('Employee added successfully');
});

// PUT update an entire employee record (Update)
router.put('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === employeeId);

  if (!employee) {
    return res.status(404).send('Employee not found');
  }

  const { name, course, roll_no } = req.body;

  if (!name && !course && !roll_no) {
    return res.status(400).send('No fields provided to update');
  }

  employee.name = name || employee.name;
  employee.course = course || employee.course;
  employee.roll_no = roll_no || employee.roll_no;

  res.status(200).send('Employee updated successfully');
});

// PATCH partially update an employee record (Update)
router.patch('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === employeeId);

  if (!employee) {
    return res.status(404).send('Employee not found');
  }

  const { name, course, roll_no } = req.body;

  employee.name = name ? name : employee.name;
  employee.course = course ? course : employee.course;
  employee.roll_no = roll_no ? roll_no : employee.roll_no;

  res.status(200).send('Employee partially updated successfully');
});

// DELETE an employee record (Delete)
router.delete('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employeeIndex = employees.findIndex(emp => emp.id === employeeId);

  if (employeeIndex === -1) {
    return res.status(404).send('Employee not found');
  }

  employees.splice(employeeIndex, 1);
  res.status(204).send();
});

module.exports = router;

