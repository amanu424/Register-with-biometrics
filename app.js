const path = require('path');
const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const defaultRoute = require('./routes/defaultRoute');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('viewss', path.join(__dirname, 'views'))
// Middleware
app.use(flash())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secre', resave: false, saveUninitialized: true }));
// Routes
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/*', defaultRoute);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error for debugging
    res.redirect('/register'); // Redirect to /register in case of an error
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
