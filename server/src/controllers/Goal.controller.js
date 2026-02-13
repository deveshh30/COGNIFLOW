export const addGoal = async (req, res) => {
  try {
    const newGoal = await Goal.create(req.body);

    
    req.io.emit("goal-added", newGoal); 

    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};