const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const User = require('./models/User');

const app = express();
const port = 6246;

app.use(cors());
app.use(express.json());

app.get('/user', async (req, res) => {
    try {
        const newUser = await User.find();
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    confirmPassword: {
        required: true,
        type: String
    }
});

const User = mongoose.model('UserLists', userSchema);

app.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    console.log(req.body);

    const userFound = await User.findOne({ email });
    if (userFound) {
        return res.status(400).json({ message: "Error: Email already registered" });
    } else if (password.length < 8) {
        return res.status(400).json({ message: 'Error: Password should be at least 8 characters long' });
    } else if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ message: 'Error: Password should contain at least one uppercase letter' });
    } else if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Error: Passwords do not match' });
    } else {
        const newUser = new User({ ...req.body });
        newUser.save()
            .then((savedUser) => {
                return res.status(200).json(savedUser);
            })
            .catch((error) => {
                console.log('Error saving user to the database:', error);
                return res.status(500).json({ message: 'Error: Failed to save user to the database' });
            });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    const userFound = await User.findOne({ email });
    if (!userFound) {
        return res.status(404).json({ message: "User Not Found" });
    } else if (userFound.password !== password) {
        return res.status(401).json({ message: "Incorrect Password" });
    } else {
        return res.status(200).json({ message: "Login Successfully", user: userFound });
    }
});

app.put('/user', async (req, res) => {
    const { userId, name } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { name }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(200).json({ message: "User name updated successfully", user });
    } catch (error) {
        console.log('Error updating user:', error);
        return res.status(500).json({ message: 'Error: Failed to update user' });
    }
});


  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const DATABASE_URL = "mongodb+srv://shahraimkhan:MSKN-6247@cluster0.zerzinh.mongodb.net/Signup-Users";
const mongoString = DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log('Database connection error:', error);
});

database.once('open', () => {
    console.log('Database Connected');
});
