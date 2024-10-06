const express = require("express");
const app = express();
// const users = require("./routes/user.js");
// const posts = require("./routes/post.js");
const session = require("express-session");
// const cookieParser = require("cookie-parse");
// app.use(cookieParser());

// app.use("/users",users);
// app.use("/posts",posts);

// app.get("/getCookies",(req,res) => {
//     console.dir(req.cookies);
//     res.send("Got the cookies!");
// })

// app.get("/getcookies" , (req, res) => {
//     let {name} = "anonymous";
// })



app.use(session({secret:"mysupersecretstring" ,resave:false,saveUninitialized:true}));

// app.get("/reqcount" , (req,res) => {
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times `);
// })

app.get("/register",(req,res) => {
    let { name = "anonymous" } =  req.query;
    // res.send(req.session);
    res.send(name);
})
// app.get("/test" , (req,res) => {
//     res.send("Welcome to my website");
// })

app.listen(3000,() => {
    console.log("Server is listening to 3000");
});


