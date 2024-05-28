const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.post('/', async (req, res) => {
  try {
    const { id, employee_name, product_name } = req.body;
    const employee = await Employee.create({
      id,
      employee_name,
      product_name,
    });
    res.status(201).redirect('/login/admin-editemployee');
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(400).json({ error: 'Cannot add employee' });
  }
});

router.get('/:id/update', async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { id: req.params.id } });
    if (employee) {
      res.render('update-employee', { employee });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    console.error('Error fetching employee:', err);
    res.status(400).json({ error: 'Cannot fetch employee' });
  }
});

router.post('/:id/update', async (req, res) => {
  try {
    const { employee_name, product_name } = req.body;
    const updatedEmployee = await Employee.update(
      {
        employee_name,
        product_name,
      },
      { where: { id: req.params.id } }
    );
    if (updatedEmployee) {
      res.redirect('/login/admin-editemployee');
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(400).json({ error: 'Cannot update employee' });
  }
});

router.post('/:id?_method=DELETE', async (req, res) => {
  try {
    const deleted = await Employee.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.redirect('/login/admin-editemployee');
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(400).json({ error: 'Cannot delete employee' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.destroy({ where: { id: req.params.id } });
    if (deletedEmployee) {
      res.redirect('/login/admin-editemployee');
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
