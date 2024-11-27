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
		return res.status(400).json("Email, username or password is required.");
});

app.post("/signup", async (req, res) => {
	// Get the user data from request body
	const {
		body: { email, username, password },
	} = req;
	console.log(email, username, password);

	// Check if the data is empty
	// Return error if it is
	if (!email || !username || !password)
		return res.status(400).json("Email, username or password is required.");

	try {
		// Check if any user with the provided email or username from client exist
		const userWithSameEmailOrUsername = await pool.query(
			"SELECT * FROM users WHERE email = $1 OR username = $2",
			[email, username]
		);

		if (userWithSameEmailOrUsername.rowCount !== 0) {
			return res
				.status(409)
				.json("Email or username already exist in database. Try logging in.");
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json("Error when querying database level 1");
	}
});

app.listen(port, () => console.log(`Listening on port ${port}`));
