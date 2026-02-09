import mongoose, { Schema } from 'mongoose';

const GoalSchema = new mongoose.Schema ({
    title : {type : String, required : true},
    progress: { type: Number, default: 0 },
    status: { type: String, default: "On Track" },
    createdAt: { type: Date, default: Date.now }
});

const Goal = mongoose.model('Goal', GoalSchema);
export default Goal;