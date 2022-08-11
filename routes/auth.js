
const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User')


router.post("/register", async (req,res) => {

    const username = req.body.username;

   const usern = await User.findOne({username:username})
    try {

        if(!usern){
            const user = new User(req.body)
            await user.save();
            res.status(200).json(user);
        }else{
            res.status(500).json("change your username")
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})




//login

router.post("/login",async (req,res)=>{

    try{

const username = req.body.username;
const password = req.body.password;

    const Username = await User.findOne({username:username});

    if(Username.password === password){

res.status(200).json(Username)
    
    }else{
      
        res.status(500).json()
        res.send("details");

    }
}catch(e){
  
}
})


module.exports = router;