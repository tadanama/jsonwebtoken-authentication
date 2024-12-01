import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import pool from "./db.js";

async function login(req, res) {
	// Get the user data from request body
	const {
		body: { email, password },
	} = req;
	console.log(email, password);

	// Check if the data is empty
	// Return error if it is
	if (!email || !password)
		return res.status(400).json("Email, username or password is required.");

	// Check if user exist in database
	try {
		const foundUserEmail = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);

		// Send error if user with the email provided don't exist
		if (foundUserEmail.rowCount === 0)
			return res
				.status(409)
				.json("User email don't exist in database. Try signing up.");

		// Check the password hash from database with the password from the user
		const passwordMatch = await bcrypt.compare(
			password,
			foundUserEmail.rows[0].password_hash
		);

		if (passwordMatch) {
			// Generate access token and refresh token
			// User id is the payload
			const accessToken = jwt.sign(
				{ id: newUser.rows[0].id },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "5m" }
			);
			const refreshToken = jwt.sign(
				{ id: newUser.rows[0].id },
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: "15m" }
			);

			// Send refreshToken as httpOnly cookie
			// Set expire date with the same value as the refreshToken
			res.cookie("jwt", refreshToken, {
				maxAge: 1000 * 60 * 15,
				httpOnly: true,
			});

			return res.status(201).json({ accessToken });
		} else {
			return res.status(401).json("Incorrect password");
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json("Something went wrong");
	}
}

async function signup(req, res) {
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

		// If there are rows returned, send an error
		if (userWithSameEmailOrUsername.rowCount !== 0) {
			return res
				.status(409)
				.json("Email or username already exist in database. Try logging in.");
		}

		// Hash the password
		const hash = await bcrypt.hash(password, 15);

		// Insert user into database
		// Return the id of the newly inserted user
		try {
			const newUser = await pool.query(
				"INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id",
				[email, username, hash]
			);

			// Generate access token and refresh token
			// User id is the payload
			const accessToken = jwt.sign(
				{ id: newUser.rows[0].id },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "5m" }
			);
			const refreshToken = jwt.sign(
				{ id: newUser.rows[0].id },
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: "15m" }
			);

			// Send refreshToken as httpOnly cookie
			// Set expire date with the same value as the refreshToken
			res.cookie("jwt", refreshToken, {
				maxAge: 1000 * 60 * 15,
				httpOnly: true,
			});

			return res.status(201).json({ accessToken });
		} catch (error) {
			console.error(error);
			return res.status(500).json("Something went wrong");
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json("Error when querying database level 1");
	}
}

// Refresh the user's access token
// Check if refresh token is valid first
function refresh(req, res) {
	
}

export { login, signup };
