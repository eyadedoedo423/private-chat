const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Structure to store which socket belongs to which user
const users = new Map();

// Rooms identified by string combining two user IDs sorted alphabetically
function getRoomName(userA, userB) {
  return [userA, userB].sort().join('#');
}

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // User joins with their userId
  socket.on('join', ({ userId }) => {
    if (!userId) {
      socket.emit('errorMessage', 'Missing userId on join');
      return;
    }
    users.set(userId, socket.id);
    socket.userId = userId;
    console.log(`User ${userId} joined with socket id ${socket.id}`);
    socket.emit('joined', { userId });
  });

  // User wants to start private chat with peerId + send message
  socket.on('privateMessage', ({ toUserId, message }) => {
    if (!socket.userId) {
      socket.emit('errorMessage', 'You must join first before sending messages');
      return;
    }
    if (!toUserId || !message) {
      socket.emit('errorMessage', 'toUserId and message are required for privateMessage');
      return;
    }
    const room = getRoomName(socket.userId, toUserId);
    // Join the room if not already in it
    socket.join(room);
    // Also join the other user if online
    const peerSocketId = users.get(toUserId);
    if (peerSocketId) {
      io.sockets.sockets.get(peerSocketId).join(room);
    }
    // Broadcast message to the room (both users)
    io.to(room).emit('newMessage', {
      from: socket.userId,
      to: toUserId,
      message,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      users.delete(socket.userId);
      console.log(`User ${socket.userId} disconnected`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

