import express from "express";
import env from "dotenv";

import pool from "./db.js";

// Enable the use environment variables
env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Route handler for user login
app.post("/login", (req, res) => {
	const {
		body: { email, username, password },
	} = req;
	console.log(username, password);

	if (!email || !username || !password)
		return res.status(400).json("Username and password cannot be empty.");
});

app.post("/signup", (req, res) => {
	// Get the user data from request body
	const {
		body: { email, username, password },
	} = req;
	console.log(email, username, password);

	// Check if the data is empty
	// Return error if it is
	if (!email || !username || !password)
		return res.status(400).json({ error: "Username or password is required" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
