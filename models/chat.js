
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({ //schema is a blueprint of the collection
    from : {
        type : String,
        required : true
    }
    ,to : {
        type : String,
        required : true
        }
    ,msg: {
        type : String,
        maxLength:50,
    }
    ,created_at : {
        type : Date,
        required:true,
        default: Date.now,
    }
    //updated_at also here
});

const Chat = mongoose.model("Chat",chatSchema); //Chat is the name of the collection

module.exports = Chat; //exporting Chat