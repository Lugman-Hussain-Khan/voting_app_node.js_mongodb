const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  symbolId: {
    type: Number,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  tagLine: {
    type: String,
    required: true
  },
  voteCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);