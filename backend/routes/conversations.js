const router = require('express').Router();
const Conversation = require('../models/Conversations');

router.post('/', async (req, res) => {
    try {
        const { ticketId, messages } = req.body;

        if (!ticketId) {
            return res.status(400).json({ message: 'ticketId and sender are required' });
        }

        const newConversation = new Conversation({
            ticketId,
            messages: messages || [],
        });

        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);
    } catch (error) {
        console.error('Error creating conversation:', error);
        res.status(500).json({ message: 'Failed to create conversation' });
    }
});

// Get a conversation by ticketId
router.get('/:ticketId', async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            ticketId: req.params.ticketId,
        })
            // .populate('messages.sender', 'username')
            // .populate('ticketId', 'title');

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        res.status(200).json(conversation);
    } catch (error) {
        console.error('Error fetching conversation:', error);
        res.status(500).json({ message: 'Failed to fetch conversation' });
    }
});

// Add a new message to a conversation
router.post('/:ticketId/messages', async (req, res) => {
    try {
        let { type, content, sender } = req.body;

        if (!type || !content || !sender) {
            return res.status(400).json({ message: 'type, content, and sender are required' });
        }
        sender = sender==='user' ? null : sender;

        if (!['text', 'image', 'video'].includes(type)) {
            return res.status(400).json({ message: 'Invalid message type' });
        }

        const conversation = await Conversation.findOne({
            ticketId: req.params.ticketId,
        });

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        conversation.messages.push({
            type,
            content,
            sender,
            createdAt: new Date(),
        });

        const updatedConversation = await conversation.save();
        res.status(200).json(updatedConversation);
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).json({ message: 'Failed to add message' });
    }
});

module.exports = router;