import { Router } from "express";

import { login, signup } from "../controllers/authController.js";

const router = Router();

// Route handler for user login
router.post("/login", login);

// Sign up new user
router.post("/signup", signup);
