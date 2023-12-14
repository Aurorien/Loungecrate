import cors from "cors";
import * as dotenv from "dotenv";
import { Client } from "pg";
import express from "express";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();

app.use(cors());

// Endpoint for adding user

// Endpoint for log in user

// Endpoint for getting events for logged in user

// Endpoint for adding event

// Endpoint for searching or getting bands

// Endpoint for adding bands

// Endpoint for searching or getting venues

// Endpoint for adding venues

// Endpoint for searching or getting city

// Endpoint for adding city
