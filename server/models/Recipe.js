const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required',
  },
  description: {
    type: String,
    required: 'This field is required',
  },
  image: {
    type: String,
    required: 'This field is required',
  },
  email: {
    type: String,
    required: 'This field is required',
  },
  ingrdients: {
    type: Array,
    required: 'This field is required',
  },

  category: {
    type: String,
    enum: ['Nigerian', 'South African', 'Zimbabwean', 'Liberian', 'Egyptian'],
    required: 'This field is required',
  },
})

recipeSchema.index({
  name: 'text',
  description: 'text',
  category: 'text',
  ingrdients: 'text',
})

module.exports = mongoose.model('recipes', recipeSchema)
