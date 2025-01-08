import express from "express";
import verifyJWT from "../middleware/verifyJWT";

// Instantiate router
const router = express.Router();

// Example protected routes
router.get("/", verifyJWT, (req, res) => {
	res.status(200).json({ message: "You are authenticated" });
});
