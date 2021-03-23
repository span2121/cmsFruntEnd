const express = require('express')
const router = express.Router()
const StudentController =   require('../controller/student.controller');
// Retrieve all employees
router.get('/', StudentController.findAll);
// Create a new student
router.post('/', StudentController.create);
// Retrieve a single student with id
router.get('/:id', StudentController.findById);
// Update a student with id
router.put('/:id', StudentController.update);
// Delete a student with id
router.delete('/:id', StudentController.delete);
module.exports = router