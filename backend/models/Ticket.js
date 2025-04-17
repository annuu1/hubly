const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['unresolved','resolved'],
        default:'unresolved'
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
})

const Model = mongoose.model('Ticket', TicketSchema);
module.exports = Model;


