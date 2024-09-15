const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const authrouter = require('./controller/auth');
const itemrouter = require('./routes/itemRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongodbUrl = process.env.DBCON;

// Middleware
app.use(bodyparser.json());
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUrl);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
    }
};
connectDB();

// Routes
app.use("/api", authrouter);
app.use("/api", itemrouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
