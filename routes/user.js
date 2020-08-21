
const express = require("express");
const userRouter = express();
const {userList, userPages} = require("../views");
const { User, Page } = require("../models");

userRouter.get("/", async(req, res, next)=>{
    try{
        const users = await User.findAll();
        res.send(userList(users));
    }catch (error){next(error)}

});

userRouter.post("/:userId", async(req, res, next)=>{
    try{
        const user = await User.findByPk(req.params.userId);
        const pages = await Page.findAll({
            where: {
                authorId: req.params.userId
            }
        })
        res.send(userPages(user, pages))
    }catch(error){next(error)}
});

