import express from "express";
import env from "dotenv";

// Enable the use environment variables
env.config();

const app = express();
const port = process.env.PORT || 3000;

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
