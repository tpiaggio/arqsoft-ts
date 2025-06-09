// src/index.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { createClient } from 'redis';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379', 10);

// Middleware to parse JSON bodies
app.use(express.json());

let mongoConnectionStatus = 'Disconnected';
let redisConnectionStatus = 'Disconnected';

// --- MongoDB Connection ---
mongoose.connect(MONGO_URI)
  .then(() => {
    mongoConnectionStatus = 'Connected';
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    mongoConnectionStatus = `Error: ${err.message}`;
    console.error('MongoDB connection error:', err);
  });

// --- DEFINE MONGOOSE SCHEMA AND MODEL ONCE HERE ---
// Define TestSchema
const TestSchema = new mongoose.Schema({
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// Define TestModel (check if it's already defined to prevent re-compilation in certain dev scenarios)
// This check is good practice, especially with hot-reloading, though moving it out of the route is the primary fix.
const TestModel = mongoose.models.Test || mongoose.model('Test', TestSchema);

// --- Redis Connection ---
const redisClient = createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
  legacyMode: true
});

redisClient.on('connect', () => {
  redisConnectionStatus = 'Connected';
  console.log('Redis connected successfully!');
});

redisClient.on('error', (err) => {
  redisConnectionStatus = `Error: ${err.message}`;
  console.error('Redis connection error:', err);
});

redisClient.connect().catch(console.error);

// --- Routes ---

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Express.js with TypeScript, MongoDB, and Redis!</h1><p>Running on PID: ${process.pid}</p>`);
});

app.get('/status', async (req: Request, res: Response) => {
  let redisPingStatus = 'N/A';
  try {
    await redisClient.ping();
    redisPingStatus = 'OK';
  } catch (err: any) {
    redisPingStatus = `Error: ${err.message}`;
  }

  res.json({
    message: 'Service Status',
    mongoDB: mongoConnectionStatus,
    redis: {
      connection: redisConnectionStatus,
      ping: redisPingStatus
    },
    pid: process.pid,
    timestamp: new Date().toISOString()
  });
});

app.get('/data', async (req: Request, res: Response) => {
  try {
    const key = 'myTestKey';
    const value = `Hello from Redis at ${new Date().toISOString()} (PID: ${process.pid})`;

    await redisClient.set(key, value);
    const retrievedValue = await redisClient.get(key);

    // Now, TestModel is already defined globally, so we just use it
    const newDoc = new TestModel({ message: `Data from MongoDB (PID: ${process.pid})!` });
    await newDoc.save();
    const docs = await TestModel.find().limit(5).sort({ createdAt: -1 });

    res.json({
      message: 'Data interaction successful!',
      pid: process.pid,
      redis: {
        setKey: key,
        setValue: value,
        retrievedValue: retrievedValue
      },
      mongoDB: {
        lastFiveDocs: docs
      }
    });
  } catch (error: any) {
    console.error('Error in /data route:', error);
    res.status(500).json({ error: 'Failed to interact with services', details: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}, PID: ${process.pid}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await mongoose.disconnect();
  await redisClient.quit();
  console.log('MongoDB and Redis connections closed.');
  process.exit(0);
});
