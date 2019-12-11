const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys');

const ItemController = require('./routes/api/ItemController');


const app = express();


// middleware

app.use(express.json());

// DB Connection
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('mongoDB connected')
}).catch(err => {
    console.error(err);
});

// Use Routes

app.use('/api/items', ItemController);

// Serve static assets if in production

// Configuring Port

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

