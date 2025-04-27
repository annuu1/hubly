const mongoose = require('mongoose');


const botSettingsSchema = new mongoose.Schema({
    headerColor:{
        type: String,
        default : '#33475B'
    },
    backgroundColor:{
        type: String,
        default : '#F7F8FA'
    },
    customizedMessages:[
        {
            type: String,
            default : 'Hello, how can I help you?'
        }
    ],
    welcomeMessage:{
        type: String,
        default : "👋 Want to chat about Hubly? I'm an chatbot here to help you find your way."
    },
    missedChatTimer:{
        type : String,
    }
})

const BotSettings = mongoose.model('BotSettings', botSettingsSchema);
module.exports = BotSettings;