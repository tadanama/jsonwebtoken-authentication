import env from "dotenv";
import pg from "pg";
const { Pool } = pg;

// Enable the use environment variables
env.config();

// Configure database connection
const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

export default pool;