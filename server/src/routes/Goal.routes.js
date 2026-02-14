import express from 'express';
import Goal from '../models/Goal.js';
import { addGoal, updateGoalProgress } from '../controllers/Goal.controller.js';

const router = express.Router();

router.get('/all' , async(req, res) => {
    try {
        const goals = await Goal.find().sort({ createdAt: -1 });
        res.json(goals);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
})

router.patch("/progress/:id", updateGoalProgress);

router.post('/add', addGoal);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGoal = await Goal.findByIdAndDelete(id);

    if (!deletedGoal) {
      return res.status(404).json({ success: false, message: "Goal not found" });
    }

    res.status(200).json({ success: true, message: "Goal deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;