const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
});
