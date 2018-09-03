const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Tag = mongoose.model('Tag', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5
  }
}));

router.get('/', async (req, res) => {
    console.log("Inside get");
  const tags = await Tag.find().sort('name');
  res.send(tags);
});

router.post('/', async (req, res) => {
  const { error } = validateTag(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let tag = new Tag({ name: req.body.name });
  tag = await tag.save();
  
  res.send(tag);
});

router.put('/:id', async (req, res) => {
  const { error } = validateTag(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const tag = await Tag.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!tag) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(tag);
});

router.delete('/:id', async (req, res) => {
  const tag = await Tag.findByIdAndRemove(req.params.id);

  if (!tag) return res.status(404).send('The genre with the given ID was not found.');

  res.send(tag);
});

router.get('/:id', async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) return res.status(404).send('The genre with the given ID was not found.');

  res.send(tag);
});

function validateTag(tag) {
  const schema = {
    name: Joi.string().min(1).required()
  };

  return Joi.validate(tag, schema);
}

module.exports = router;