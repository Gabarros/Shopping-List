const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const ItemController = require('./routes/api/ItemController');


const app = express();


// middleware

app.use(express.json());

// DB Connection

const db = config.get('mongoURI');

mongoose.connect(db, {
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

if(process.env.NODE_ENV === 'production'){
    // set static folder

    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index,html'));
    });
}

// Configuring Port

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

