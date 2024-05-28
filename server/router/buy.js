const express = require('express');
const router = express.Router();
const Asset = require('../models/asset');
const Employee = require('../models/employee');

router.post('/:unique_id', async (req, res) => {
  try {
    const { id } = req.body; 
    const { unique_id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Employee ID is required' });
    }

    const asset = await Asset.findOne({ where: { unique_id } });
    if (!asset || !asset.available || asset.stock <= 0) {
      return res.status(400).json({ error: 'Asset not available for purchase' });
    }

    
    asset.stock -= 1;

    if (asset.stock < 0) {
      asset.stock = 0;
    }
    if (asset.stock === 0) {
      asset.available = false;
    }
    await asset.save();
    let employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(400).json({ error: 'Invalid Employee ID' });
    }
    let productNames = employee.product_name ? employee.product_name.split(',') : [];
    if (!productNames.includes(asset.product_name)) {
      productNames.push(asset.product_name);
      employee.product_name = productNames.join(',');
      await employee.save();
    }

    res.redirect('/login/employee-display?success=true');
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
