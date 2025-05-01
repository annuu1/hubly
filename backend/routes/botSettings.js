const express = require('express');
const router = express.Router();
const BotSettings = require('../models/BotSettings');

router.post('/', async (req, res) => {
    const { headerColor, backgroundColor, customizedMessages, welcomeMessage, missedChatTimer, formPlaceholders} = req.body;

    // Validate the request body
    if (!headerColor || !backgroundColor || !customizedMessages || !welcomeMessage || !missedChatTimer) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newBotSettings = new BotSettings({
        headerColor,
        backgroundColor,
        customizedMessages,
        welcomeMessage,
        missedChatTimer,
        formPlaceholders
    });
    await newBotSettings.save()
    res.status(201).json({ message: 'Bot settings created successfully', botSettings: newBotSettings });
})

router.get('/', async (req, res) => {
    try {
        const botSettings = await BotSettings.findOne();
        if (!botSettings) {
            return res.status(404).json({ message: 'Bot settings not found' });
        }
        res.status(200).json({ botSettings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/', async (req, res) => {
    const { headerColor, backgroundColor, customizedMessages, welcomeMessage, missedChatTimer, formPlaceholders } = req.body;

    // Validate the request body
    if (!headerColor || !backgroundColor || !customizedMessages || !welcomeMessage || !missedChatTimer) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const botSettings = await BotSettings.findOne();
        if (!botSettings) {
            return res.status(404).json({ message: 'Bot settings not found' });
        }

        // Update fields
        botSettings.headerColor = headerColor;
        botSettings.backgroundColor = backgroundColor;
        botSettings.customizedMessages = customizedMessages;
        botSettings.welcomeMessage = welcomeMessage;
        botSettings.missedChatTimer = missedChatTimer;
        if (formPlaceholders) {
            botSettings.formPlaceholders = formPlaceholders;
        }

        await botSettings.save();
        res.status(200).json({ message: 'Bot settings updated successfully', botSettings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;