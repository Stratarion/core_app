import mongoose from "mongoose";

const emailsListSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  permission: { type: Boolean, required: true },
  id: { type: String },
});

export default mongoose.model("Email", emailsListSchema);