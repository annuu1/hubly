const router = require('express').Router();
const Ticket = require('../models/Ticket');
const Conversation = require('../models/Conversations');
const auth = require('../middleware/auth');

// Get analytics data
router.get('/', auth, async (req, res) => {
    try {
        const tickets = await Ticket.find({});
        
        const resolvedCount = tickets.filter(ticket => ticket.status === 'resolved').length;
        const unresolvedCount = tickets.filter(ticket => ticket.status === 'unresolved').length;
        
        const totalChats = tickets.length;
        
        let totalReplyTime = 0;
        let replyCount = 0;
        
        for (const ticket of tickets) {
            const conversation = await Conversation.findOne({ ticketId: ticket._id });
            if (conversation && conversation.messages.length > 1) {
                const userMessages = conversation.messages.filter(msg => msg.sender === null);
                const agentMessages = conversation.messages.filter(msg => msg.sender !== null);
                
                if (userMessages.length > 0 && agentMessages.length > 0) {
                    const firstUserMessageTime = new Date(userMessages[0].createdAt);
                    const firstAgentMessageTime = new Date(agentMessages[0].createdAt);
                    const replyTime = (firstAgentMessageTime - firstUserMessageTime) / 1000;
                    totalReplyTime += replyTime;
                    replyCount++;
                }
            }
        }
        
        const averageReplyTime = replyCount > 0 ? Math.round(totalReplyTime / replyCount) : 0;
        
        let missedChats = 0;
        for (const ticket of tickets) {
            const conversation = await Conversation.findOne({ ticketId: ticket._id });
            if (conversation) {
                const hasAgentReply = conversation.messages.some(msg => msg.sender !== null);
                if (!hasAgentReply) {
                    missedChats++;
                }
            }
        }
        
        const weeklyMissedChats = await getWeeklyMissedChats();
        
        res.status(200).json({
            resolvedTickets: {
                resolved: resolvedCount,
                unresolved: unresolvedCount,
                total: totalChats
            },
            averageReplyTime: averageReplyTime,
            totalChats: totalChats,
            missedChats: weeklyMissedChats
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ message: 'Failed to fetch analytics data' });
    }
});

async function getWeeklyMissedChats() {
    const weeks = 10;
    const weeklyData = [];
    const now = new Date();
    
    for (let i = weeks - 1; i >= 0; i--) {
        const startDate = new Date(now);
        startDate.setDate(startDate.getDate() - (i * 7));
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        
        const tickets = await Ticket.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        });
        
        let missedChats = 0;
        for (const ticket of tickets) {
            const conversation = await Conversation.findOne({ ticketId: ticket._id });
            if (conversation) {
                const hasAgentReply = conversation.messages.some(msg => msg.sender !== null);
                if (!hasAgentReply) {
                    missedChats++;
                }
            }
        }
        
        weeklyData.push(missedChats);
    }
    
    return weeklyData;
}

module.exports = router; 