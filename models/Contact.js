import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  category: {
    type: String,
    enum: ["Friends", "Family", "Professional", "Business", "Secret"],
  },
});

export default mongoose?.models?.Contact ||
  mongoose.model("Contact", ContactSchema);
