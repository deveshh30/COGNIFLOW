export const addGoal = async (req, res) => {
  try {
    const newGoal = await Goal.create(req.body);
    const {id} = req.params;
    const {progress} = req.body;

    const updatedGoal = await Goal.findByIdAndUpdate(
      id, 
      { progress }, 
      { new: true } 
    );

    
    req.io.emit("goal-added", newGoal); 

    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};