import express from "express";
import env from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";

// Enable the use environment variables
env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/routes", protectedRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
