import express from "express";
import env from "dotenv";

import authRoutes from "./routes/authRoutes.js";

// Enable the use environment variables
env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
