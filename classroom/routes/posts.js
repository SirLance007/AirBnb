const express = require("express");
const router = express.Router();
const app = require("./routes/posts.js");

router.get('/', (req,res)=>{
    res.send("Home Page")
});

router.get('/posts', (req,res)=>{
    res.send("User Page"); 
});

// Show users
router.get("/posts/id:" , (req,res) =>{
    res.send("Get for show users");
})

router.post("/posts", (req,res)=>{
    req.send("Create new user");
})

router.delete("/posts/:id", (req,res)=>{
    req.send("Delete user");
})

module.exports = router;