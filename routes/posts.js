const Post = require("../models/Post");
const User = require("../models/User");
const router= require("express").Router();

//insering 
router.post("/", async(req,res) => {
 try {
    const pos = new Post(req.body);
    await pos.save()
    res.status(200).json(pos)
 } catch (error) {
     res.status(500).json(error);
 }
});

router.get("/" ,  async(req,res)=>{
    
   // const username = req.query.user;
    
    
    try {

           const posts = await Post.find();
            res.status(200).json(posts); 
        

    } catch (error) {
        res.status(500).json(error);
    }
})

router.get("/lim" , async (req,res) => {
  const lim = await Post.find().limit(2)
  res.status(200).json(lim);
})



// getting single post of the user

router.get("/:id", async (req,res) => {
  try {
      const post = await Post.findById(req.params.id);
   
      res.status(200).json(post);
  } catch (error) {
   
  }
})

router.delete("/:id" , async (req,res) => {
  const post = await  Post.findById(req.params.id);

  try {
      if (post.username === req.body.username){
          try {
             await post.delete();
             res.status(200).json("post deleted....");

          } catch (err) {
              res.status(401).json("post not updated");
          }
      }else{

      }
  } catch (error) {
   
  }


})

router.put("/:id", async (req,res) => {
  try {
      const post = await Post.findById(req.params.id);

      if(post.username === req.body.username){
try {
    const updatePost = await Post.findByIdAndUpdate(req.params.id , {
        $set:req.body
    },{new:true});
    res.status(200).json("updated post...");
} catch (err) {
    res.status(500).json(err);
}
      }else{

      }
  } catch (error) {
  
  }
})

module.exports = router;