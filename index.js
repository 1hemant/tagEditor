const mongoose = require('mongoose');
const tags = require('./routes/tags');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/tagEditorDb')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/tags', tags);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
