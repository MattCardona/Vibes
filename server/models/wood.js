const mongoose = require('mongoose');

const woodSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 50
  }
});

const Wood = mongoose.model('Wood', woodSchema);

module.exports = { Wood };