// const express = require('express');
// const { uid } = require('uid');
// const cors = require('cors');
// const app = express();
// const port = 6246;

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send("hello");
// });

// const mongoose = require('mongoose');
// const DATABASE_URL = "mongodb+srv://shahraimkhan:MSKN-6247@cluster0.zerzinh.mongodb.net/";
// const mongoString = DATABASE_URL;

// mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Database Connected');
//   })
//   .catch((error) => {
//     console.log('Error connecting to database:', error);
//   });

// const userSchema = new mongoose.Schema({
//   id: String,
//   name: String,
//   email: String,
//   password: String,
//   confirmPassword: String
// });

// const User = mongoose.model('User', userSchema);

// app.post('/register', (req, res) => {
//   const { name, email, password, confirmPassword } = req.body;
//   console.log(req.body);

//   User.findOne({ email })
//     .then((userFound) => {
//       if (userFound) {
//         return res.status(400).json({ message: "Error: Email already registered" });
//       } else if (password.length < 8) {
//         return res.status(400).json({ message: 'Error: Password should be at least 8 characters long' });
//       } else if (!/[A-Z]/.test(password)) {
//         return res.status(400).json({ message: 'Error: Password should contain at least one uppercase letter' });
//       } else if (password !== confirmPassword) {
//         return res.status(400).json({ message: 'Error: Passwords do not match' });
//       } else {
//         const newUser = new User({ name, email, password, confirmPassword, id: uid(16) });
//         newUser.save()
//           .then((savedUser) => {
//             return res.status(200).json(savedUser);
//           })
//           .catch((error) => {
//             console.log('Error saving user to database:', error);
//             return res.status(500).json({ message: 'Error: Failed to save user to database' });
//           });
//       }
//     })
//     .catch((error) => {
//       console.log('Error finding user in database:', error);
//       return res.status(500).json({ message: 'Error: Failed to find user in database' });
//     });
// });

// app.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);

//   User.findOne({ email })
//     .then((userFound) => {
//       if (!userFound) {
//         return res.status(404).json({ message: "User Not Found" });
//       } else if (userFound.password !== password) {
//         return res.status(401).json({ message: "Incorrect Password" });
//       } else {
//         return res.status(200).json({ message: "Login Successfully", user: userFound });
//       }
//     })
//     .catch((error) => {
//       console.log('Error finding user in database:', error);
//       return res.status(500).json({ message: 'Error: Failed to find user in database' });
//     });
// });

// app.get('/users', (req, res) => {
//   User.find({})
//     .then((users) => {
//       return res.status(200).json(users);
//     })
//     .catch((error) => {
//       console.log('Error fetching users from database:', error);
//       return res.status(500).json({ message: 'Error: Failed to fetch users from database' });
//     });
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

const express = require('express');
// const { uid } = require('uid');
const cors = require('cors');
const app = express();
const port = 6246;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello");
});

const users = [
    {
        // id: 1111111111111111,
        name: "shahraim",
        email: "shahraim.khan27112002@gmail.com",
        password: "A12345678",
        confirmPassword: "A12345678"
    }
];

app.post('/register', (req, res) => {
    const { email, password, confirmPassword } = req.body;
    console.log(req.body);

    const userFound = users.find((obj) => obj.email === email);
    if (userFound) {
        return res.status(400).json({ message: "Error: Email already registered" });
    } else if (password.length < 8) {
        return res.status(400).json({ message: 'Error: Password should be at least 8 characters long' });
    } else if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ message: 'Error: Password should contain at least one uppercase letter' });
    } else if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Error: Passwords do not match' });
    } else {
        users.push({ ...req.body });
        return res.status(200).json(users);
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    const userFound = users.find((obj) => obj.email === email);
    if (!userFound) {
        return res.status(404).json({ message: "User Not Found" });
    } else if (userFound.password !== password) {
        return res.status(401).json({ message: "Incorrect Password" });
    } else {
        return res.status(200).json({ message: "Login Successfully", user: userFound });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const mongoose = require('mongoose');
const DATABASE_URL = "mongodb+srv://shahraimkhan:MSKN-6247@cluster0.zerzinh.mongodb.net/";
const mongoString = DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});
