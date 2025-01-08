import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT.js";

// Instantiate router
const router = Router();

// Example protected routes
router.get("/", verifyJWT, (req, res) => {
	res.status(200).json({ message: "You are authenticated" });
});

export default router;