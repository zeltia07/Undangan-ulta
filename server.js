const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const path = require('path');
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// API Routes
app.post('/api/guest', async (req, res) => {
  const { name, wish, status } = req.body;
  try {
    const guest = await prisma.guest.create({
      data: {
        name,
        wishes: {
          create: {
            text: wish,
            status,
          }
        }
      },
      include: { wishes: true }
    });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all guests with wishes
app.get('/api/guests', async (req, res) => {
  try {
    const guests = await prisma.guest.findMany({
      include: { wishes: true }
    });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle all other routes by serving index.html (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api`);
}); 