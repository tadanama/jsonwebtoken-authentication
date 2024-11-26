import express from "express";
import env from "dotenv";

// Enable the use environment variables
env.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
