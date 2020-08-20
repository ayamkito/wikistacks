
const express = require("express");
const wikiRouter = express();
const views = require("../views");
const addPage = require("../views/addPage");

wikiRouter.get("/", (req, res, next)=>{
    res.redirect("/wiki")

});

wikiRouter.post("/", (req, res, next)=>{
res.send("got to post /wiki/")
});

wikiRouter.get("/add", (req, res, next)=>{
    res.send(views.addPage())
})
module.exports = wikiRouter