const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//update 
router.put("/:id" , async (req,res) => {
  if(req.body.userId === req.params.id){
try {
    const updateuser = await User.findByIdAndUpdate(req.params.id , {
        $set:req.body
    },{new:true})
    res.status(200).json(updateuser)
} catch (error) {
    res.status(401).json(error)
}
  }else{
res.status(500).json("not updated");
  }
})



//delete

router.delete("/:id", async (req,res) => {
  if(req.body.userId === req.params.id){
      try {
        
        const user = await User.findById(req.params.id)

        try {
            await Post.deleteMany({username:user.username});
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted User...")
        } catch (error) {
            res.status(401).json(error)
         
        }

      } catch (err) {
          res.status(401).json(err)
      }
  }else{

  }
});

//get user 

router.get("/:id" , async (req,res) => {
  try {
      const user = await User.findById(req.params.id)
      
  } catch (error) {
      res.status(500).json(error);
  }
})

router.get("/", async (req,res) => {
  const u = await User.find();
  res.status(200).json(u)
})

module.exports = router;