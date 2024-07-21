const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config'); // Import the Mongoose model
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define the port
const port = 5000;

// Render the login page
app.get('/', (req, res) => {
    res.render('login');
});

// Render the signup page
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Handle signup form submission
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user document
        const newUser = new collection({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.redirect('/'); // Redirect to login page after successful signup
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send('Error during signup');
    }
});

// Handle login form submission
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await collection.findOne({ email: email });

        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send('Invalid email or password');
        }

        // Optionally set a session or a token for authenticated users here

        res.redirect('/dashboard'); // Redirect to a protected route or dashboard
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send('Error during login');
    }
});

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
