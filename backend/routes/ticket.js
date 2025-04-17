const route = require('express').Router();
const Ticket = require('../models/Ticket');
const User = require('../models/User');

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
route.get('/', async (req, res) =>{
    try{
        const tickets = await Ticket.find().populate('assignedTo', 'name email');
        return res.status(200).json(tickets);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error'});
    }
})

module.exports = route;