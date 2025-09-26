const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const outpassRoutes = require('./routes/outpass');
const studentRoutes = require('./routes/studentRoutes');
const eventPermissionRoutes = require('./routes/eventPermissionRoutes');
const securityRoutes = require('./routes/securityRoutes');  // Security routes
const outpassAnalyticsRoutes = require('./routes/outpassAnalyticsRoutes'); // Analytics routes
const facultyRoutes = require('./routes/facultyRoutes');
dotenv.config();

const app = express();
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'PermitFlow Backend API is running' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  console.log('Connected to DB:', mongoose.connection.name);
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  // process.exit(1); // Removed to allow server to run without DB
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/outpass', outpassRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/event-permissions', eventPermissionRoutes);
app.use('/api/v1/security', securityRoutes);
app.use('/api/v1/outpass-analytics', outpassAnalyticsRoutes);  // <-- analytics routes
 // <-- analytics routes

app.use('/api/v1/faculty', facultyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
