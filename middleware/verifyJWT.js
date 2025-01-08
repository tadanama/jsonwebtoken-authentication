import jwt from "jsonwebtoken";
import env from "dotenv";

import pool from "../db.js";

// Enable the use environment variables
env.config();

function verifyJWT(req, res, next) {
	// Retrieve the access token from authorization headers
	const authHeader = req.headers.authorization || req.headers.authorization;

	// Authorization headers is in the format "Bearer <really-long-token>"
	// Line below extracts only the token from the header
	const token = authHeader?.split(" ")[1];

	// Return error if auth header is empty
	if (!token) return res.status(401).json("Unauthorized");

	// Get the payload of the token
	jwt.verify(
		token,
		process.env.REFRESH_TOKEN_SECRET,
		async (error, decoded) => {
			if (error) return res.status(401).json("Unauthorized");

			// Retrieve user info from database that matches the payload
			try {
				const user = await pool.query(
					"SELECT id, username FROM users WHERE id = $1",
					[decoded.id]
				);

				// Return error if user is not in database
				if (user.rowCount === 0) return res.status(401).json("Unauthorized");

				// Add dynamic property to the request object
				req.userId = user.rows.id;
				req.username = user.rows.username;

				next();
			} catch (error) {
				console.error(error);
				res.status(500).json("Somthing went wrong");
			}
		}
	);
}

export default verifyJWT;
