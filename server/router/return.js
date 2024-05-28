const express = require('express');
const router = express.Router();
const Asset = require('../models/asset');
const ReturnedAsset = require('../models/returnedAsset');
const Employee = require('../models/employee');

router.post('/:unique_id', async (req, res) => {
  const { unique_id } = req.params;
  const { reason, id } = req.body;
  try {
    const asset = await Asset.findOne({ where: { unique_id: unique_id } });

    if (!asset) {
      return res.status(404).send('Asset not found');
    }

    await asset.update({ available: false, stock: asset.stock - 1 });

    let returnedAsset = await ReturnedAsset.findOne({ where: { id } });

    if (returnedAsset) {
      const updatedProducts = returnedAsset.product_name ? returnedAsset.product_name.split(',') : [];
      updatedProducts.push(asset.product_name);

      await returnedAsset.update({
        product_name: updatedProducts.join(','),
        reason
      });
    } else {
      returnedAsset = await ReturnedAsset.create({
        product_name: asset.product_name,
        reason,
        id 
      });
    }

    const employee = await Employee.findOne({ where: { id } });
    if (employee) {
      let updatedProducts = employee.product_name ? employee.product_name.split(',') : [];
      updatedProducts = updatedProducts.filter(prod => prod.trim() !== asset.product_name);

      let updatedreason = employee.reason ? employee.reason.split(',') : [];
      updatedreason = updatedreason.filter(prod => prod.trim() !== asset.reason);

      await employee.update({ product_name: updatedProducts.join(',') });
      await employee.update({ reason: updatedreason.join(',') });

    }

    const updatedEmployee = await Employee.findOne({ where: { id } });

  res.redirect('/login/employee-display');
  } catch (error) {
    console.error('Error returning asset:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
