// write in terminal to start 
// npm init -y,ejs,express,mongoose 

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname,"views")); //setting views directory
app.set("view engine", "ejs"); //setting view engine as ejs
app.use(express.static(path.join(__dirname,"public"))); //setting public directory as static directory

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

//new route 
app.get("/chats/new", (req,res) => {
    res.render("new.ejs");
})

let chat1 = new Chat({
    from: "meet",
    to: "mox",
    msg : "good morning",
    created_at : new Date(),
})

chat1.save() //UTC time
.then((res) => {
    console.log(res)
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})

app.get("/", (req,res) => {
    res.send("Hello World");
})

