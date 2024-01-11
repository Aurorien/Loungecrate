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

// app.use((req, res, next) => {
//   res.setHeader("Content-Type", "application/json; charset=utf-8");
//   next();
// });

async function databaseConnection(retryCount = 5, delay = 5000) {
  for (let i = 0; i < retryCount; i++) {
    try {
      await client.connect();
      // await client.query("SET client_encoding TO 'UTF8'");
      console.log("Database is running and the connection is established.");
      return;
    } catch (error) {
      console.error(
        `Attempt ${i + 1}: Error connecting to the database`,
        error
      );
      if (i < retryCount - 1) {
        console.log(`Retrying connection in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  console.error("All attempts to connect to the database have failed.");
}

databaseConnection();

// LOGIN

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
  console.log("Entered the /login endpoint");
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

// Endpoint for getting events for logged in user

app.post("/myevents", async (_request, response) => {
  try {
    const { username } = _request.body;
    console.log("username:", username);
    const query = `SELECT
    e.eventId,
    e.eventName,
    e.eventDate,
    e.eventTime,
    v.venueName,
    v.venueSize,
    e.eventDescription,
    (
      SELECT JSON_AGG(
        JSON_BUILD_OBJECT(
          'bandId', sub_b.bandId,
          'bandName', sub_b.bandName,
          'bandGenre', sub_b.bandGenre,
          'bandDescription', sub_b.bandDescription,
          'rider', (
            SELECT JSON_AGG(
              JSON_BUILD_OBJECT(
                'riderItemName', r.riderItemName,
                'riderItemAmount', r.riderItemAmount
              )
            ) FROM rider r WHERE r.riderEventBandId = eb.eventBandId
          )
        )
      ) FROM eventBand eb
      JOIN band sub_b ON eb.eventBandBandId = sub_b.bandId
      WHERE eb.eventBandEventId = e.eventId
    ) AS bandsAndRiders
  FROM events e
  JOIN venue v ON e.eventVenueId = v.venueId
  WHERE e.eventUserName = $1;`;
    const { rows } = await client.query(query, [username]);
    response.send(rows);
  } catch (error) {
    console.error("Error executing the SQL query:", error);
    response.status(500).send("Internal Server Error");
  }
});

// Endpoint for populating dropdowns

app.get("/dropdown-data", async (_request, response) => {
  try {
    const citiesQuery = "SELECT cityname FROM city";
    const venuesQuery = "SELECT venuename FROM venue";
    const bandsQuery = "SELECT bandname FROM band";

    const [cityResults, venueResults, bandResults] = await Promise.all([
      client.query(citiesQuery),
      // .then((result) => {
      //   console.log("City Query Result:", result.rows);
      //   // rest of your code...
      // })
      // .catch((error) => {
      //   console.error("Database Query Error:", error);
      // }),
      client.query(venuesQuery),
      client.query(bandsQuery),
    ]);

    const cities = cityResults.rows.map(
      (row: { cityname: any }) => row.cityname
    );
    const venues = venueResults.rows.map((row) => row.venuename);
    const bands = bandResults.rows.map((row) => row.bandname);

    // console.log("cities", cities);
    // console.log("venues", venues);
    // console.log("bands", bands);
    // console.log("Hölö är gött");

    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.json({ cities, venues, bands });
  } catch (error) {
    console.error("Error executing the SQL query:", error);
    response.status(500).send("Error retrieving data");
  }
});

///////////////////////////////////////////////////////////
// Debug endpoints

// app.get("/test-swedish", (_req, res) => {
//   res.setHeader("Content-Type", "text/plain; charset=utf-8");
//   res.send("Swedish: åäö ÅÄÖ");
// });

// app.get("/city", async (_request, response) => {
//   try {
//     const sql = `SELECT * FROM city;`;
//     const { rows } = await client.query(sql);
//     response.send(rows);
//   } catch (error) {
//     console.error("Error executing the SQL query:", error);
//     response.status(500).send("Internal Server Error");
//   }
// });

// app.get("/citytest", async (_request, response) => {
//   try {
//     const sql = `SELECT * FROM city;`;
//     const result = await client.query(sql);
//     response.setHeader("Content-Type", "text/plain; charset=utf-8");
//     response.send(JSON.stringify(result.rows, null, 2));
//   } catch (error) {
//     console.error("Error executing the SQL query:", error);
//     response.status(500).send("Internal Server Error");
//   }
// });

// app.get("/test", async (_request, response) => {
//   const data = { message: "Contact with backend confirmed" };
//   response.json(data);
// });

///////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
