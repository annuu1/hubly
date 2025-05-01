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
    formPlaceholders: {
        name: {
          type: String,
          default: 'Your Name'
        },
        email: {
          type: String,
          default: 'example@gmail.com'
        },
        phone: {
          type: String,
          default: '+1 (000) 000-0000'
        }
      },
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