const express = require('express');
const router = express.Router();
const { getItems, createItem } = require('../controllers/item');
const { cacheMiddleware } = require('../middlewares/cache');

router.get('/', cacheMiddleware, getItems);

router.post('/', createItem);

module.exports = router;
