const { client } = require('../config/redis');
const generateCacheKey = require('../utils/cacheKeyGenerator')


async function cacheMiddleware(req, res, next) {
    const key = generateCacheKey(req);
    const data = await client.get(key);
    try {
        if (data !== null) {
            console.log('Serving from cache')
            res.send(JSON.parse(data));
        } else {
            next();
        }
    } catch (err) {
        console.error('Error retrieving data from Redis cache', err);
    }
}

async function setCache(key, data, expiration) {
    try {
        await client.set(key, JSON.stringify(data), { EX: expiration });
    } catch (err) {
        console.error('Error setting data in Redis cache', err);
    }
}

async function invalidateCache(key) {
    try {
        await client.del(key);
    } catch (err) {
        console.error('Error deleting data from Redis cache', err);
    }
}

module.exports = { cacheMiddleware, setCache, invalidateCache };
