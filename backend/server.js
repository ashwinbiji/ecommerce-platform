const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());
// Middleware to allow frontend requests
app.use(cors());

// Basic route to test the server
app.get('/api/status', (req, res) => {
  res.json({ message: 'API is running successfully' });
});

// Mount the user routes
app.use('/api/users', userRoutes); 

// Error Handling Middleware (must be below routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});