
const express = require("express");
const userRouter = express();

userRouter.get("/", (req, res)=>{
    res.send("got to get /user/")

});

userRouter.post("/", (req, res)=>{
res.send("got to post /user/")
});

userRouter.get("/add", (req, res)=>{
    res.send("got to get /user/add")
})
module.exports = userRouter