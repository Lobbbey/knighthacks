const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Route Imports
const userRoute = require('./route/user.js');
const mediaRoute = require('./route/.js');



app.use('/api/user', userRoute);
app.use('/api/media', mediaRoute);

app.get('/', (req, res) => res.send('API Running'));

// Mongoose Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(() => console.error(err))


const PORT = process.env.PORT || 5000; // User port from ENV or Default port
app.listen(PORT, () => console.log(`Server start on ${PORT}`));