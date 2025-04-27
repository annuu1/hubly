const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/tickets', require('./routes/ticket'))
app.use('/api/botSettings', require('./routes/botSettings'))
app.use('/api/conversations', require('./routes/conversations'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
