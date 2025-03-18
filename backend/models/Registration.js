const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  name: String,
  department: String,
  semester: String,
  email: String,
  phone: String,
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
});

module.exports = mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema);