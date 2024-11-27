import express from "express";
import env from "dotenv";
import pg from "pg";
const { Pool } = pg;

// Enable the use environment variables
env.config();

const app = express();
const port = process.env.PORT || 3000;

// Configure database connection
const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: "todoapp" || process.env.DB_NAME,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

app.use(express.json());

// Route handler for user login
app.post("/login", (req, res) => {
	const {
		body: { username, password },
	} = req;
	console.log(username, password);

	if (!username || !password)
		return res.status(400).json("Username and password cannot be empty.");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
