const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MongoURL = process.env.MONGO_URL;

mongoose.connect(MongoURL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
