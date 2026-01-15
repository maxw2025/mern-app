require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const keyRoutes = require('./routes/key');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

// middleware 
app.use(express.json());

// routes
app.use('/api/keys', keyRoutes);

app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.json({ status: 'API running' });
});

if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '../frontend/dist');

    app.get(/^\/.*$/, (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}


const PORT = process.env.PORT || 3000;
// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`connected to db & listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

