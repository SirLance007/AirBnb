const express = require("express");
const router = express.Router();
const app = require("./routes/user.js");

router.get('/', (req,res)=>{
    res.send("Home Page")
});

router.get('/users', (req,res)=>{
    res.send("User Page"); 
});

// Show users
router.get("/users/id:" , (req,res) =>{
    res.send("Get for show users");
})

router.post("/users", (req,res)=>{
    req.send("Create new user");
})

router.delete("/users/:id", (req,res)=>{
    req.send("Delete user");
})

module.exports = router;