import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http'; 
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Create __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create HTTP server from Express app
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server);

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
