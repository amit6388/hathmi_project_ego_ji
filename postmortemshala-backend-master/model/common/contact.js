const mongoose = require("mongoose");
const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  msg: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("Enquiry_tbl", EnquirySchema);
