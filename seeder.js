const fs = require('fs');
const mongoose =  require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({path: './config/config.env'});

// Load models
const Bootcamp = require('./models/Bootcamp')

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
});

// Read JSON files

const bootcamp = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamp)
        console.log('Data Imported...');
        process.exit();
    } catch (error) {
       console.error(error); 
    }
}

// Delete Data
const DeleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        console.log('Data Destroyed...');
        process.exit();
    } catch (error) {
       console.error(error); 
    }
}

if(process.argv[2] === '-i'){
    importData();
} else if(process.argv[2] === '-d'){
   DeleteData();
}