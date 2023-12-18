-- CREATE DATABASE loungecrate

CREATE TABLE users (
  userId SERIAL PRIMARY KEY,
  userName VARCHAR(30) NOT NULL UNIQUE,
  userPassword VARCHAR(255)
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
  FOREIGN KEY (eventVenueId) REFERENCES venue(venueId)
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
  FOREIGN KEY (riderBandId) REFERENCES EventBand(EventBandId)
);

---------------------------------------------------------------------

INSERT INTO users (userName, userPassword)
VALUES ('test', 'test');

INSERT INTO city (cityName)
VALUES (
  'Göteborg',
  'Tokyo',
  'Lövstabruk',
  'Berlin'
  );

INSERT INTO venue (venueName, venueSize, venueCityId)
VALUES (
  ('Flowerave', 'Large', 1),
  ('The Dome', 'Huge', 2),
  ('Folkets Hus', 'Large', 3),
  ('Waldrock', 'Medium', 4)
);

INSERT INTO band (bandName, bandGenre, bandDescription, bandCityId)
VALUES (
  ('Myceline', 'darkwave', 'Out of Hisingsdimman emerges this darkwave band inspired by mushrooms and a connection with nature', 1),
  ('Yggdrasil', 'kraut', 'Analog, pure, and reverberating. Unique musical consistencies influenced by the acoustics of the radomes at Teufelsberg in Berlin.', 4),
  ('Idril', 'ambient', 'Atmospheric, infinite depth and width. Idril takes us on a bottomless journey through fantastic soundscapes.', 3)
);

INSERT INTO events (eventName, eventDescription, eventDate, eventTime, eventVenueId, eventUserId)
VALUES (
  ('The Cave', 'Welcome into the dark and wonderous space where bats sings in choir.', '2025-04-28', '19:00', 2, 1),
  ('Klubb Twilight', 'En på en resa i ljudlandskap med Myceline och Idril!', '2025-09-03', '19:00', 3, 1)
)

INSERT INTO eventBand (eventBandEventId, eventBandBandId)
VALUES (
  (1, 2), -- 1: Yggrasil på The Cave
  (2, 1), -- 2: Myceline på Klubb Twilight
  (2, 3) -- 3: Idril på Klubb Twilight
)


INSERT INTO rider (riderItemName, riderItemAmount, riderEventBandId)
VALUES (
  ('cola-soda', '1L', 1), ('fullgrain chocolate cookies', '10 pcs', 1),
  ('skumsvampar', '1/2 kg', 2), ('spenatsmoothie', '4 st.', 2), ('patchouli-rökelse', '1 st.', 2),
  ('melonsoda', 'ett stort glas', 3), ('luftfuktare', '1 st.', 3)
);
