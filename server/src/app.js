const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routers/api');

const app = express();

app.use(cors());

app.use(morgan('combined'));

app.use(express.json());

app.use('/api/v1', api);

/**
 * Not Found
 */
app.get('/*', (req, res) => {
    res.status(404).json({ error: "api not found!" });
});

module.exports = app;