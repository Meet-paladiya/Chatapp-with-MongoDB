// this file is uses to get the sample data in the database

const mongoose = require("mongoose");

main().then(() => {
    console.log("connection succesfull")
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
    }

    const Chat = require("./models/chat.js");

//     let allChats = [
//         {
//         from: "meet",
//         to: "mox",
//         msg : "good morning",
//         created_at : new Date(),
//     },
//     {
//         from: "harsh",
//         to: "prince",
//         msg : "good morning",
//         created_at : new Date(),
//     },
//     {
//         from: "pinal",
//         to: "hinal",
//         msg : "good morning",
//         created_at : new Date(),
//     },
//     {
//         from: "heet",
//         to: "meet",
//         msg : "good morning",
//         created_at : new Date(),
//     },
// ];

Chat.insertMany(allChats) //UTC time

// .then((res) => {
//     console.log(res)
// })
// .catch((err) => {
//     console.log(err)
// }
// )