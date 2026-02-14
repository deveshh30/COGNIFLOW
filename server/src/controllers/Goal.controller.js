import Goal from "../models/Goal.js";


export const addGoal = async (req, res) => {
  try {
    const { title, deadline } = req.body;
    
    const newGoal = await Goal.create({
      title,
      ...(deadline && { deadline: new Date(deadline) })
    });

    req.io.emit("goal-added", newGoal);
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateGoalProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress, status } = req.body;

    
    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      { progress, status },
      { new: true } 
    );

    if (!updatedGoal) {
        return res.status(404).json({ message: "Goal not found" });
    }

    
    req.io.emit("goal-progress-updated", { id, progress, status });

    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};