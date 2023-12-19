import cors from "cors";
import * as dotenv from "dotenv";
import { Client } from "pg";
import express from "express";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express(),
  port = process.env.PORT || 3000;

app.use(express.json(), cors());

async function databaseConnection() {
  try {
    await client.connect();
    console.log("Database is running and the connection is established.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
databaseConnection();

// Endpoint for adding user, WIP
app.post("/users", async (_request, response) => {
  try {
    const { userName, userPassword } = _request.body;

    // Database transaction
    await client.query("BEGIN");

    if (userName) {
      const addUserQuery = `INSERT INTO users (userName, userPassword) VALUES ($1, $2)`;
      const userValues = [userName, userPassword];

      await client.query(addUserQuery, userValues);
    }

    await client.query("COMMIT");

    response.send("User successfully added into the database");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Error executing the SQL query:", error);
    response.status(500).send("Internal Server Error");
  }
});

// Endpoint for log in user, WIP
app.post("/login", async (_request, response) => {
  const { userName, userPassword } = _request.body;

  try {
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1 and userPassword = $2",
      [userName, userPassword]
    );

    const user = result.rows[0];

    if (!user) {
      response.status(401).json({
        success: false,
        message: "No account found with that username or password",
      });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Endpoint for getting events for logged in user

// Endpoint for adding city

// Endpoint for adding venues

// Endpoint for adding bands

// Endpoint for adding event

// Endpoint for searching or getting bands

// Endpoint for searching or getting venues

// Endpoint for searching or getting city

app.listen(port, () => {
  console.log(`Ready at http://localhost:${port}/`);
});
