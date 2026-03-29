const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken'); 
require('dotenv').config();

const { initDb } = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Authentication

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ user: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ message: "Login Successful", token: token });
  }

  res.status(401).json({ error: "Invalid username or password" });
});

// db
initDb();


app.use('/tasks', taskRoutes);

// Dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running with JWT Auth on http://localhost:${PORT}`);
});