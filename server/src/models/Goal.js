import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  progress: { type: Number, default: 0 },
  status: { type: String, default: "Off Track" },
  deadline: { type: Date }, 
}, { timestamps: true });

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;