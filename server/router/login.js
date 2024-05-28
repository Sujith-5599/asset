const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { adminLogin, employeeLogin } = require('../models/login');
const Asset = require('../models/asset');
const Employee = require('../models/employee');
const ReturnedAsset = require('../models/returnedAsset'); 

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/admin', (req, res) => {
  res.render('admin-login');
});

router.get('/employee', (req, res) => {
  res.render('employee-login');
});

router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const success = await adminLogin(username, password);
    if (success) {
      res.redirect('/login/admin-asset');
    } else {
      res.render('admin-login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/employee/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const success = await employeeLogin(username, password);
    if (success) {
      res.redirect('/login/employee-display');
    } else {
      res.render('employee-login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during employee login:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/admin-asset', async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.render('admin-asset', { assets });
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/employee-display', async (req, res) => {
  try {
    const assets = await Asset.findAll();
    const success = req.query.success === 'true';
    const returnSuccess = req.query.returnSuccess === 'true';

    res.render('employee-display', { assets ,success,returnSuccess});
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/admin-editemployee', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.render('admin-editemployee', { employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/admin-return', async (req, res) => {
  try {
    // Fetch all returned assets from the database
    const returnedAssets = await ReturnedAsset.findAll();

    // Render the Pug template and pass the returned assets data to it
    res.render('admin-return', { returnedAssets });
  } catch (error) {
    console.error('Error fetching returned assets:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/employee-display', async (req, res) => {
  try {
    const assets = await Asset.findAll();
    const employee_id = req.query.id; 
    const employee_name = req.query.employee_name; 
    res.render('employee-display', { assets, employee_id, employee_name });
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).send('Internal Server Error');
  }
});






module.exports = router;
