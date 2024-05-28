const express = require('express');
const router = express.Router();
const Asset = require('../models/asset');
const Employee = require('../models/employee');

router.get('/', async (req, res) => {
  try {
    const assets = await Asset.findAll();
    const employeeId = req.session.id; 
    const employeeName = req.session.employee_name; 
    res.render('employee-display', { assets,id, employee_name });
  } catch (err) {
    console.error('Error fetching assets:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/purchase', async (req, res) => {
  try {
    const { id, employee_name, asset_id, product_name } = req.body;
    const asset = await Asset.findOne({ where: { unique_id: asset_id } });

    if (asset && asset.stock > 0) {
      await AssetIssue.create({id, asset_id });

      asset.stock -= 1;
      await asset.save();

      await Employee.update(
        {
          product_id: asset.unique_id,
          product_name: asset.product_name
        },
        { where: { id:id } }
      );

      res.redirect('/purchase'); 
    } else {
      res.status(400).json({ error: 'Asset out of stock or not found' });
    }
  } catch (err) {
    console.error('Error purchasing asset:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
