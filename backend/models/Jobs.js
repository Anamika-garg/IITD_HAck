const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type : String,
  },
  company: {
    type : String,
  },
  location: {
    type : String,
  },
  link: {
    type : String,
  },
});

const Job = new mongoose.model('Jobs' , jobSchema);
module.exports = Job;