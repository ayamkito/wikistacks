
const express = require("express");
const wikiRouter = express();
const {addPage, main, wikiPage } = require("../views");
const {Page, User} = require("../models");



wikiRouter.get("/", async(req, res, next)=>{
    try{
        const pages = await Page.findAll()
        res.send(main(pages))
    }catch (error){next(error)}
});

wikiRouter.post("/", async(req, res, next)=>{
    // const page = new Page({
    //     title: req.body.title,
    //     content: req.body.content,
    // });
    try {
        const [user, wasCreated] = await User.findOrCreate({
            //define email and name..req.body is the form submitted
            where:{
                name: req.body.name,
                email: req.body.email,
            }
        });
        const page = await Page.create(req.body);
        // console.log(await page.save())
        page.setAuthor(user)
            res.redirect(`/wiki/${page.slug}`) 
        }catch(error){next(error)}
});

wikiRouter.get("/add", async(req, res, next)=>{

    
    res.send(addPage())
});

wikiRouter.get("/:slug", async(req,res, next)=>{
    try{
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        const user = page.getAuthor()
        res.send(wikiPage(page,user))
    }catch (error){next(error)}
});
module.exports = wikiRouter