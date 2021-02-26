import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Task from './models/task.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
  let task = await Task.create(req.body);

  res.json(task);
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();

  res.json(tasks);
});

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
