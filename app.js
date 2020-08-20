const express = require("express");
const htmlTag = require("html-template-tag");
const {db} = require("./models")
const app = express();
const morgan = require("morgan")
const layout = require("./views/layout")

app.use(morgan("dev"))
// app.use(express.static("stylesheets"));

db.authenticate().
then(()=>{
    console.log("connected to database wikistack")
})


app.get("/", (req, res)=>{    
    res.send(layout(""))
});

const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");
app.use("/wiki", wikiRouter);

//allows us to push our data to postgress
const models = require("./models");
const init = async ()=>{
    await models.User.sync()
    await models.Page.sync()
    
    models.db.sync({force:true})
//this drops all tables then recreates them based on our JS definition

    //declare a port for your app
    const PORT = 1337;
    app.listen (PORT, ()=>{
        console.log(`app is listening on port ${PORT}`)
    })
}


init(); //call the function