const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken'); // 1. Added JWT
require('dotenv').config();

const { initDb } = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Use a secret key from .env or a default one
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// 1. Setup Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 2. NEW: Login Route (Authentication)
// This gives the user a "Token" if they have the right password
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple hardcoded check for the assignment
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ user: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ message: "Login Successful", token: token });
  }

  res.status(401).json({ error: "Invalid username or password" });
});

// 3. Start the Database
initDb();

// 4. Use your Task Routes
app.use('/tasks', taskRoutes);

// 5. Show the Dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 6. Start the Server
app.listen(PORT, () => {
  console.log(`Server running with JWT Auth on http://localhost:${PORT}`);
});