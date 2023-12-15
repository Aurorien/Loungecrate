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

CREATE TABLE item (
  itemId  SERIAL PRIMARY KEY,
  itemName VARCHAR(200),
  itemAmount VARCHAR(150),
);

CREATE TABLE rider (
  riderId  SERIAL PRIMARY KEY,
  riderBandId INT,
  FOREIGN KEY (riderBandId) REFERENCES band(bandId)
);

CREATE TABLE rider_item (
  riderItemId SERIAL PRIMARY KEY,
  riderId INT,
  itemId INT,
  FOREIGN KEY (riderId) REFERENCES rider(riderId),
  FOREIGN KEY (itemId) REFERENCES item(itemId)
);

CREATE TABLE event (
  eventId  SERIAL PRIMARY KEY,
  eventName VARCHAR(200),
  eventDescription TEXT,
  eventDate DATE NOT NULL,
  eventTime VARCHAR(20),
  eventVenueId INT,
  FOREIGN KEY (eventVenueId) REFERENCES venue(venueId)
);

CREATE TABLE event_rider (
  eventRiderId SERIAL PRIMARY KEY,
  eventId INT,
  riderId INT,
  FOREIGN KEY (eventId) REFERENCES event(eventId),
  FOREIGN KEY (riderId) REFERENCES rider(riderId)
);

CREATE TABLE band_rider (
  bandRiderId SERIAL PRIMARY KEY,
  bandId INT,
  riderId INT,
  eventId INT,
  FOREIGN KEY (bandId) REFERENCES band(bandId),
  FOREIGN KEY (riderId) REFERENCES rider(riderId),
  FOREIGN KEY (eventId) REFERENCES event(eventId)
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

-- INSERT INTO rider (riderItem, riderItemAmount, riderBandId)
-- VALUES (
--   ('skumsvampar', '1/2 kg', 1), ('spenatsmoothie', '4 st.', 1), ('patchouli-rökelse', '1 st.', 1),
--   ('cola-soda', '1L', 2), ('fullgrain chocolate cookies', '10 pcs', 2),
--   ('melonsoda', 'ett stort glas', 3), ('luftfuktare', '1 st.', 3)
-- );

-- INSERT INTO event (eventName, eventDescription, eventDate, eventTime, eventVenueId, eventRiderId, eventUserId)
-- VALUES (
--   ('Klubb Twilight', 'En på en resa i ljudlandskap med Myceline och Idril!', '2025-09-03', '19:00', 3, )
-- )
