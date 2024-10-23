import dotenv from 'dotenv';
dotenv.config();  // Load environment variables

// Console log to check if environment variables are loaded correctly
console.log('User:', process.env.DB_USER);          // Should print your DB_USER
console.log('Password:', process.env.DB_PASSWORD ? '***hidden***' : 'Not set');  // Hide password for security
console.log('Database:', process.env.DB_NAME);
console.log('Host:', process.env.DB_HOST);
import pg from 'pg';
import { Pool } from 'pg';

// Set up the connection pool using environment variables
const pool = new Pool({
    user: process.env.DB_USER,          // This should now be read from the .env file
    password: process.env.DB_PASSWORD,  // Same for the password
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 5432,
});

// Log when the connection to the database is established
pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database.');
});

// Handle errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client:', err);
    process.exit(1);
});

export default pool;
