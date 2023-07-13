const Item = require('../models/item');
const { setCache, invalidateCache } = require('../middlewares/cache');
const generateCacheKey = require('../utils/cacheKeyGenerator');

async function getItems(req, res) {
    try {
        const cacheKey = generateCacheKey(req);
        console.log('Serving from mongo')

        const items = await Item.find();

        // Set items in cache
        await setCache(cacheKey, items, 3600); // Cache for 1 hour

        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
}

async function createItem(req, res) {
    try {
        const { name, description } = req.body;
        const newItem = new Item({ name, description });
        const savedItem = await newItem.save();

        const cacheKey = generateCacheKey(req);

        // Invalidate cache for the cacheKey
        await invalidateCache(cacheKey);

        res.json(savedItem);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = { getItems, createItem };
