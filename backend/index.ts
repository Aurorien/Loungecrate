import cors from "cors";
import dotenv from "dotenv";
import { Client } from "pg";
import express from "express";
import path from "path";
import crypto from "node:crypto";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

const app = express(),
  port = process.env.PORT || 3000;

app.use(
  express.static(path.join(path.resolve(), "public")),
  express.json(),
  cors()
);

async function databaseConnection(retryCount = 2, delay = 5000) {
  let client;
  for (let i = 0; i < retryCount; i++) {
    client = new Client({
      connectionString: process.env.PGURI,
    });

    try {
      await client.connect();
      console.log("Database is running and the connection is established.");
      return; // Connection successful
    } catch (error) {
      console.error(
        `Attempt ${i + 1}: Error connecting to the database`,
        error
      );
      if (i < retryCount - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
      }
    } finally {
      await client.end(); // Close client regardless of success or failure
    }
  }
  console.error("All attempts to connect to the database have failed.");
}

databaseConnection();

//GET cities

app.get("/city", async (_request, response) => {
  try {
    const sql = `SELECT * FROM city;`;
    const { rows } = await client.query(sql);
    response.send(rows);
  } catch (error) {
    console.error("Error executing the SQL query:", error);
    response.status(500).send("Internal Server Error");
  }
});

//LOGIN

const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

const hashPassword = (password: string, salt: string) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash;
};

// Endpoint for log in user
app.post("/login", async (request, response) => {
  console.log("Entered th /login endpoint");
  const { username, password } = request.body;

  try {
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    const user = result.rows[0];
    console.log("user", user);

    if (!user) {
      response.status(401).json({
        success: false,
        message: "No account found with that username",
      });
      return;
    }

    const hashedPassword = hashPassword(password, user.salt);

    if (hashedPassword === user.userhashedpassword) {
      response.status(200).json({
        username: user.username,
        success: true,
        message: "Login successful",
      });
    } else {
      response.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.error("Error executing the SQL query:", error);
    response.status(500).send("Internal Server Error");
  }
});

// Endpoint for register user

app.post("/register", async (request, response) => {
  const { username, password } = request.body;

  const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);

  try {
    await client.query(
      "INSERT INTO users (username, userHashedPassword, salt) VALUES ($1, $2, $3)",
      [username, hashedPassword, salt]
    );

    response.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error executing the SQL query:", error);
    response.status(500).send("Internal Server Error");
  }
});

// GETTING EVENTS FOR LOGGED IN USER

app.get("/userevents", async (request, response) => {
  try {
    const userId = 1;
    console.log("userId:", userId);
    const { rows } = await client.query(
      "SELECT * FROM events WHERE userId = $1",
      [userId]
    );
    response.send(rows);
  } catch (error) {
    console.error("Error executing the SQL query:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
