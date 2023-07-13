const { createClient } = require('redis');
const redisUri = "redis://localhost:6379";
const client = createClient({ url: redisUri });

(async () => {
    await client.connect();
})();

client.on('connect', () => console.log('Redis Client Connected'));
client.on('error', (err) => console.log('Redis Client Error', err));

module.exports = { client };
