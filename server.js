const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const fileupload = require('express-fileupload')


// Load env files
dotenv.config({ path: './config/config.env'});

// Connect to database
connectDB();

//Route Files
const bootcamp = require('./routes/bootcamps')
const courses = require('./routes/courses')

const app = express();

// Body parser
app.use(express.json())

// Dev loggin middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// File Upload 
app.use(fileupload())

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/bootcamps', bootcamp)
app.use('/api/v1/courses', courses)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
})

