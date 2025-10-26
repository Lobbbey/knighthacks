const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Make sure cors is installed if you use it
require('dotenv').config();

const app = express();

// --- Middleware ---
app.use(cors()); // Allow requests from frontend origin (adjust options for production)
app.use(express.json()); // Parse JSON bodies

// --- Import Routes ---
const usersRoutes = require('./route/user.js');
const mediaRoutes = require('./route/media.js');

// --- Use Routes ---
// Mount the routers at specific base paths
app.use('/api/users', usersRoutes);
app.use('/api/media', mediaRoutes);

// --- Simple Base Route ---
app.get('/', (req, res) => res.send('API is running...'));

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Exit if DB connection fails
    });

// --- Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
