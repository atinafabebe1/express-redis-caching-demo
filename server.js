const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/item');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/h', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(express.json());

// Routes
app.use('/items', itemRoutes);

// Start the server
app.listen(5000, () => {
    console.log('Server started on port 5000');
});
