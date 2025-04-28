const route = require('express').Router();
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const auth = require('../middleware/auth')

route.post('/', async (req, res) =>{
    const {name, phone, email} = req.body;
    if(!name || !phone || !email){
        return res.status(400).json({message:'Please fill all the fields'});
    }
    if(name.length < 3 || name.length > 50){
        return res.status(400).json({message:'Name should be between 3 and 50 characters'});
    }
    if(phone.length < 10 || phone.length > 15){
        return res.status(400).json({message:'Phone number should be between 10 and 15 characters'});
    }
    
    try{
        //get the admin user
        const adminUser = await User.findOne({role:"admin"}).select('_id');
        if(!adminUser){
            return res.status(404).json({message:'Admin user not found'});
        }       

        const ticket = new Ticket({
            name,
            phone,
            email,
            assignedTo: adminUser._id,
        });

        await ticket.save();
        return res.status(201).json({message:'Ticket created successfully', ticket});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error'});
    }
})

//get all tickets
route.get('/', auth, async (req, res) =>{
    try{
        const tickets = await Ticket.find({}).populate('assignedTo', 'name email');
        return res.status(200).json(tickets);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error'});
    }
})
route.get('/assignedTickets',auth,async(req, res)=>{
    try{
        const tickets = await Ticket.find({assignedTo:req.user.id}).populate('assignedTo', 'name email');
        return res.status(200).json(tickets);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error'});
    }
})
//assign ticket to user
route.put('/:id/assign', auth, async(req, res) =>{
    const {id} = req.params;
    const {memberId} = req.body;
    if(!memberId){
        return res.status(400).json({message: 'Please select a member'});
    }
    try{
        const ticket = await Ticket.findById(id);
        if(!ticket){
            return res.status(404).json({message:'Ticket not found'});
        }
        ticket.assignedTo = memberId;
        await ticket.save();
        return res.status(200).json({message:'Ticket assigned successfully', ticket});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error'});
    }
})

//update ticket status
route.put('/:id/status', auth, async(req, res) =>{
    const {id} = req.params;
    const {status} = req.body;
    if(!status){
        return res.status(400).json({message: 'Please select a status'});
    }
    try{
        const ticket = await Ticket.findById(id);
        if(!ticket){
            return res.status(404).json({message:'Ticket not found'});
        }
        ticket.status = status;
        await ticket.save();
        return res.status(200).json({message:'Ticket status updated successfully', ticket});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error'});
    }
})

module.exports = route;