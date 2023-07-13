function generateCacheKey(req) {
    const url = req.originalUrl;
    const queryParams = JSON.stringify(req.query);
    const headers = JSON.stringify(req.headers);

    return `${url}:${queryParams}:${headers}`;
}

module.exports = generateCacheKey;
