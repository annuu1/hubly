const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
    {
        ticketId: {
            type: String,
            required: true,
            unique: true
        },
        messages: [
            {
                type: {
                    type: String,
                    enum: ['text', 'image', 'video'],
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
                sender: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

const Conversation = mongoose.model('Conversation', ConversationSchema);
module.exports = Conversation;