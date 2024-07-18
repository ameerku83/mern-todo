const express = require('express');
require("dotenv").config()
const mongoose = require('mongoose');
const cors = require('cors');
const morgan =require("morgan");
const router = require('./todoRoutes/route');
const app = express();
const PORT = 3200;
app.use(morgan('dev'))
app.use(cors());  
app.use(express.json());
  
app.use("/",router)
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("db connected"))
.catch((err)=>console.error(err))
// const router = require('./todoRoutes/route');





  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
