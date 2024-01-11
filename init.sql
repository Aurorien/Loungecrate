-- CREATE DATABASE loungecrate


DROP TABLE IF EXISTS rider;
DROP TABLE IF EXISTS eventBand;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS band;
DROP TABLE IF EXISTS venue;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  userId SERIAL PRIMARY KEY,
  userName VARCHAR(50) UNIQUE NOT NULL,
  userHashedPassword TEXT NOT NULL,
  salt TEXT NOT NULL
);

CREATE TABLE city (
  cityId  SERIAL PRIMARY KEY,
  cityName VARCHAR(200)
);

CREATE TABLE venue (
  venueId  SERIAL PRIMARY KEY,
  venueName VARCHAR(200),
  venueSize VARCHAR(200),
  venueCityId INT,
  FOREIGN KEY (venueCityId) REFERENCES city(cityId)
);

-----

CREATE TABLE band (
  bandId  SERIAL PRIMARY KEY,
  bandName VARCHAR(200),
  bandGenre VARCHAR(200),
  bandDescription TEXT,
  bandCityId INT,
  FOREIGN KEY (bandCityId) REFERENCES city(cityId)
);

CREATE TABLE events (
  eventId  SERIAL PRIMARY KEY,
  eventName VARCHAR(200),
  eventDescription TEXT,
  eventDate DATE,
  eventTime VARCHAR(20),
  eventVenueId INT,
  eventUserName VARCHAR(50),
  FOREIGN KEY (eventVenueId) REFERENCES venue(venueId),
  FOREIGN KEY (eventUserName) REFERENCES users(userName)
);

CREATE TABLE eventBand (
  eventBandId  SERIAL PRIMARY KEY,
  eventBandEventId INT,
  eventBandBandId INT,
  FOREIGN KEY (eventBandEventId) REFERENCES events(eventId),
  FOREIGN KEY (eventBandBandId) REFERENCES band(bandId)
);

CREATE TABLE rider (
  riderId  SERIAL PRIMARY KEY,
  riderItemName VARCHAR(200),
  riderItemAmount VARCHAR(200),
  riderEventBandId INT,
  FOREIGN KEY (riderEventBandId) REFERENCES eventBand(eventBandId)
);

---------------------------------------------------------------------

-- Shadowood, testuser
INSERT INTO users (userName, userHashedPassword, salt)
VALUES
('Shadowood', '4aeac9c07a966f31e40bdd2525fd3f6d4b91c79c51aaa4a93e5fd9af19967c635e57a3eb548897def6d24b225d0fc534085d0fe609fd575d96d4e3323a4c0a40', '52be92b677b078bc2447642fcff02b57');

INSERT INTO city (cityName)
VALUES
  ('TBA'),
  ('Gothenburg'),
  ('Tokyo'),
  ('Leufstabruk'),
  ('Berlin');

INSERT INTO venue (venueName, venueSize, venueCityId)
VALUES
  ('TBA', 'TBA', 1),
  ('Flowerave', 'Large', 2),
  ('The Dome', 'Huge', 3),
  ('Folkets Hus', 'Large', 4),
  ('Waldrock', 'Medium', 5);

INSERT INTO band (bandName, bandGenre, bandDescription, bandCityId)
VALUES
  ('TBA', 'TBA', 'TBA', 1),
  ('Myceline', 'darkwave', 'Out of Hisingsdimman emerges this darkwave band inspired by mushrooms and a connection with nature', 2),
  ('Yggdrasil', 'kraut', 'Analog, pure, and reverberating. Unique musical consistencies influenced by the acoustics of the radomes at Teufelsberg in Berlin.', 5),
  ('Idril', 'ambient', 'Atmospheric, infinite depth and width. Idril takes us on a bottomless journey through fantastic soundscapes.', 4);

INSERT INTO events (eventName, eventDescription, eventDate, eventTime, eventVenueId, eventUserName)
VALUES
  ('The Cave', 'Welcome into the dark and wonderous space where bats sings in choir.', '2025-04-28', '19:00', 3, 'Shadowood'),
  ('Club Twilight', 'A journey in soundscape with Myceline and Idril!', '2025-09-03', '19:00', 4, 'Shadowood');

INSERT INTO eventBand (eventBandEventId, eventBandBandId)
VALUES
  (1, 3), -- 1: The Cave, Yggrasil
  (2, 2), -- 2: Club Twilight, Myceline
  (2, 4); -- 3: Club Twilight, Idril


INSERT INTO rider (riderItemName, riderItemAmount, riderEventBandId)
VALUES
  ('cola-soda', '1L', 1), ('fullgrain chocolate cookies', '10 pcs', 1),
  ('marshmallow mushroom', '1/2 kg', 2), ('spinach smoothie', '4 pcs', 2), ('patchouli incense', '1 pcs', 2),
  ('melonsoda', 'one big glass', 3), ('humidifier', '1 pcs', 3);
