function generateCacheKey(req) {
    const url = req.originalUrl;
    const queryParams = JSON.stringify(req.query);

    return `${url}:${queryParams}`;
}

module.exports = generateCacheKey;
