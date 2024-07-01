require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Make sure to import cors
const mongoose = require('mongoose');
const createUserRouter = require('./routes/CreateUser');
const createDisplayData = require('./routes/CreateDisplayData'); // Assuming this is the correct path

// Initialize Express app
const app = express();
const port = 3001;

// MongoDB URI from environment variables or directly
const uri = process.env.MONGODB_URI || 'mongodb+srv://danielkshitij:******cluster0.paytpud.mongodb.net/FlavorFleet?retryWrites=true&w=majority&appName=Cluster0';

// Middleware to handle CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));


app.listen(port, () => {
  console.log(`Example app listening on pOrt ${port}`);
});


// Function to connect to MongoDB and fetch data
async function connectToDatabase() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Database connected successfully');

    // Debugging: print database name
    console.log('Database name:', mongoose.connection.db.databaseName);

    // Fetch all items from the 'fooditems' collection
    const fetched_data = await mongoose.connection.db.collection("fooditems").find({}).toArray(); // Wait for data retrieval
    console.log('Fetching data from fooditems collection...', fetched_data);

    // Fetch all items from the 'foodchoices' collection
    const foodCategory = await mongoose.connection.db.collection("foodchoices").find({}).toArray();
    console.log('Fetching data from foodchoices collection...', foodCategory);

    // Store data in global variables
    global.fooditems = fetched_data;
    global.foodCategory = foodCategory;

    // Set up middleware
    app.use(express.json());

    // Set up routes
    app.use('/api', createUserRouter);
    app.use('/api', createDisplayData);
   


    // Start the Express server after fetching data
    console.log(`Server is running on http://localhost:${port}`);
    
    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
      process.exit(0);
    });

  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit with error code if connection fails
  }
}

// Call the function to connect to MongoDB and start the server
connectToDatabase();
