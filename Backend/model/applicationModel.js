const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  position: {
    type: String,
    required: true,
  },
  company:{
    type:String,
    required:true
  },
  status: {
    type: String,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
