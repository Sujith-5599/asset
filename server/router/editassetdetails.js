const express = require('express');
const router = express.Router();
const Asset = require('../models/asset');

router.post('/', async (req, res) => {
  try {
    const { product_name, unique_id, description, stock, available } = req.body;
    // Check if image is provided
    let image_upload = null;
    if (req.file) {
      image_upload = req.file.buffer.toString('base64');
    }

    const asset = await Asset.create({
      product_name,
      unique_id,
      description,
      stock,
      available: available === 'on',
      image_upload
    });
    res.status(201).redirect('/login/admin-asset');
  } catch (err) {
    console.error('Error creating asset:', err);
    res.status(400).json({ error: 'Cannot add asset' });
  }
});

router.get('/:unique_id/update', async (req, res) => {
  try {
    const asset = await Asset.findOne({ where: { unique_id: req.params.unique_id } });
    if (asset) {
      res.render('update-asset', { asset });
    } else {
      res.status(404).json({ error: 'Asset not found' });
    }
  } catch (err) {
    console.error('Error fetching asset:', err);
    res.status(400).json({ error: 'Cannot fetch asset' });
  }
});

router.post('/:unique_id/update', async (req, res) => {
  try {
    const { product_name, description, stock, available, image_upload } = req.body;
    const updatedAsset = await Asset.update(
      {
        product_name,
        description,
        stock,
        available: available === 'on',
        image_upload: image_upload ? Buffer.from(image_upload, 'base64') : null
      },
      { where: { unique_id: req.params.unique_id } }
    );
    if (updatedAsset) {
      res.redirect('/login/admin-asset');
    } else {
      res.status(404).json({ error: 'Asset not found' });
    }
  } catch (err) {
    console.error('Error updating asset:', err);
    res.status(400).json({ error: 'Cannot update asset' });
  }
});

router.post('/:unique_id?_method=DELETE', async (req, res) => {
  try {
    const deleted = await Asset.destroy({ where: { unique_id: req.params.unique_id } });
    if (deleted) {
      res.redirect('/login/admin-asset');
    } else {
      res.status(404).json({ error: 'Asset not found' });
    }
  } catch (err) {
    console.error('Error deleting asset:', err);
    res.status(400).json({ error: 'Cannot delete asset' });
  }
});

router.delete('/:unique_id', async (req, res) => {
  try {
    const deletedAsset = await Asset.destroy({ where: { unique_id: req.params.unique_id } });
    if (deletedAsset) {
      res.redirect('/login/admin-asset');
    } else {
      res.status(404).json({ error: 'Asset not found' });
    }
  } catch (err) {
    console.error('Error deleting asset:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
