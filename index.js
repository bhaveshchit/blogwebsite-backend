const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute  = require('./routes/auth');
const postRoute = require('./routes/posts');
const userRoute = require("./routes/user");
const app = express();
const cors = require("cors");
dotenv.config();
const multer = require('multer');
const path = require("path");


app.use(express.json());



mongoose.connect(process.env.MONGO_URI,()=>{
   console.log("connected");
})
app.use(cors());

app.use("/images",express.static(path.join(__dirname,"/images")) )

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
})

const upload = multer({storage:storage});
app.post('/api/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded");
})

app.use("/api/auth",authRoute );
app.use("/api/posts" , postRoute);
app.use("/api/user",userRoute)











app.listen(process.env.PORT,()=>{
    console.log(`port: ${process.env.PORT} `)
})