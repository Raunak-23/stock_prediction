require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

// Database connection and server start
const startServer = async () => {
  try {
    // Sync database models (this will create tables if they don't exist)
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database synced successfully');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
const userRoutes = require('./routes/userRoutes');

// ...

// Routes
app.use('/api/stocks', stockRoutes);
app.use('/api/users', userRoutes);