const express = require('express');
const router = express.Router();
const Category = require('../db/categories');

router.get('/', (req, res) => {
  Category.getAll().then (result => {
    res.status(200).json(result);
  }).catch (error => {
      res.status(200).json();
      console.log(error);
  });
});

router.get('/:category_id/videos', (req, res) => {
  Category.getCategoryVideos(req.params.category_id).then (result => {
    res.status(200).json(result);
  }).catch (error => {
    console.log(error);
    res.status(200).json();
  });
});

module.exports = router;
