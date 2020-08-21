const express = require("express");
const htmlTag = require("html-template-tag");
const {db} = require("./models")
const morgan = require("morgan")
const layout = require("./views/layout")
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

db.authenticate().
then(()=>{
    console.log("connected to database wikistack")
})


app.get("/", (req, res)=>{    
    res.redirect("/wiki")
});

const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");
app.use("/wiki", wikiRouter);

//allows us to push our data to postgress
const models = require("./models");
const init = async ()=>{
    await models.User.sync()
    await models.Page.sync()
    
    
    //this drops all tables then recreates them based on our JS definition
    //models.db.sync({force:true})    //force database to sync with new data and tables.
    
    models.db.sync()    //just sync data and keep tables as they are

    //declare a port for your app
    const PORT = 1337; 
    app.listen (PORT, ()=>{
        console.log(`app is listening on port ${PORT}`)
    })
}


init(); //call the function