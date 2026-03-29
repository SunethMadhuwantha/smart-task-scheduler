const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// GET /tasks 
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    
    // Send the list 
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/', async (req, res) => {
  const { title, description, duration, priority, deadline } = req.body;

  // Validation 
  if (!title || duration <= 0 || priority < 1 || priority > 5 || !deadline) {
    return res.status(400).json({ 
      error: "Invalid input. Ensure title is present, duration > 0, and priority is between 1-5." 
    });
  }

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, duration, priority, deadline) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, duration, priority, deadline]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /tasks/:id 
router.get('/:id', async (req, res) => {
  const { id } = req.params; 

  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    // return 404 
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /tasks/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, duration, priority, deadline } = req.body;

  try {
    const result = await pool.query(
      'UPDATE tasks SET title=$1, description=$2, duration=$3, priority=$4, deadline=$5 WHERE id=$6 RETURNING *',
      [title, description, duration, priority, deadline, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /tasks/:id 
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// POST /schedule 
router.post('/schedule', async (req, res) => {
  try {
    
    const result = await pool.query('SELECT * FROM tasks');
    let tasks = result.rows;

    // Define Workday 
    const WORK_START_HOUR = 9; // 9:00 AM
    const WORK_END_HOUR = 17;  // 5:00 PM
    const TOTAL_MINUTES = (WORK_END_HOUR - WORK_START_HOUR) * 60; // 480 minutes

    // Priority 5 firstn by Deadline)
    tasks.sort((a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority; 
      }
      return new Date(a.deadline) - new Date(b.deadline); 
    });

    let currentTime = 0; 
    const scheduledTasks = [];
    const unscheduledTasks = [];

    
    tasks.forEach(task => {
      if (currentTime + task.duration <= TOTAL_MINUTES) {
        //Calculate clock time
        const startHour = Math.floor((WORK_START_HOUR * 60 + currentTime) / 60);
        const startMin = (WORK_START_HOUR * 60 + currentTime) % 60;
        
        const endHour = Math.floor((WORK_START_HOUR * 60 + currentTime + task.duration) / 60);
        const endMin = (WORK_START_HOUR * 60 + currentTime + task.duration) % 60;

        scheduledTasks.push({
          ...task,
          startTime: `${startHour.toString().padStart(2, '0')}:${startMin.toString().padStart(2, '0')}`,
          endTime: `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`
        });

        currentTime += task.duration; 
      } else {
        
        unscheduledTasks.push({
          ...task,
          reason: "Not enough time remaining in the 8-hour workday"
        });
      }
    });

    // Send the result
    res.json({
      date: new Date().toISOString().split('t')[0],
      workday: "09:00 AM - 05:00 PM",
      scheduled: scheduledTasks,
      unscheduled: unscheduledTasks
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate schedule" });
  }
});

module.exports = router;