require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

const app = express();

// Connect to Database only when running as a standalone server.
// In serverless environments (Vercel functions) we avoid connecting
// at import time to prevent runtime failures during cold starts
// when environment variables may not be available. Routes that
// require the DB should ensure a connection exists before DB ops.

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes')); // New route

app.get('/', (req, res) => {
    res.json({ message: 'Enterprise HMS API is running...' });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    // Only connect when running the server as a persistent process
    connectDB();

    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}

module.exports = app;
