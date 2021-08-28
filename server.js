const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const mongodbURL = 'mongodb://localhost/interview-db';

mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const report = require('./routes/report');

app.get('/api', (req, res) => res.send('API working fine!'));

app.use('/api', report);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}...`));