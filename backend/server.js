const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes'); // <-- Added product routes import
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Basic test route
app.get('/api/status', (req, res) => {
  res.json({ message: 'API is running successfully' });
});

// --- ROUTES ---
app.use('/api/users', userRoutes); 
app.use('/api/products', productRoutes); // <-- Added product routes here (ABOVE error handlers)

// --- ERROR HANDLERS (Must be at the very bottom) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});