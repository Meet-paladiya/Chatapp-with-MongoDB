// write in terminal to start 
// npm init -y,ejs,express,mongoose 

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js"); //importing chat.js for getting the schema(Chat)
const methodOverride = require("method-override"); //

app.set("views", path.join(__dirname,"views")); //setting views directory
app.set("view engine", "ejs"); //setting view engine as ejs
app.use(express.static(path.join(__dirname,"public"))); //setting public directory as static directory
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

main().then(() => { //async function
    console.log("connection succesfull") //if connection is succesfull
}) 
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
    }

    //Index Route
app.get("/chats", async (req,res) => {  
    let chats = await Chat.find(); //find all chats
    console.log(chats); //print all chats
    res.render("index.ejs", {chats}); //render index.ejs
})

//new chat add karvan mate
//new route  //ayya thi new.ejs ma jay che
app.get("/chats/new", (req,res) => {
    res.render("new.ejs");
})

//Create Route  // permanent chat add thai km k database ma store thay aetle // new.ejs ma call hovathi (action="/chats" method="POST") app.post thi data store thay
app.post("/chats",(req,res) => {
    let {from,to,msg} = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date(),
    });
    newChat
    .save()
    .then(res => {console.log("chat is saved")}) // then use karie to await no use karie to chale
    .catch(err => {console.log("Error!")});
    
    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit",async(req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//Update Route
/*edit.ejs ma che aa code km k html form ma get and post use na thai sake so method-override no use karyo che <form method="POST" action="/chats/<%= chat._id %>?_method=PUT"> */
app.put("/chats/:id",async (req,res) => {
    let {id} = req.params; 
    let { msg : newMsg} =  req.body; //destructuring
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(id, //find chat by id and update it
        {msg:newMsg},
        {runValidators:true,new:true});
        console.log(updatedChat);
        res.redirect("/chats");
    });


//Destroy Route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let deletedchat = await Chat.findByIdAndDelete(id);
        console.log(deletedchat);
        res.redirect("/chats");
    } catch (err) {
        console.error("Error deleting chat", err);
        res.redirect("/chats");
    }
});
// let chat1 = new Chat({
//     from: "meet",
//     to: "mox",
//     msg : "good morning",
//     created_at : new Date(),
// })

// chat1.save() //UTC time
// .then((res) => {
//     console.log(res)
// })

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})

app.get("/", (req,res) => {
    res.send("Hello World");
})

