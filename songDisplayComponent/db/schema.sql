DROP DATABASE IF EXISTS 5cloud_song_display;

CREATE DATABASE 5cloud_song_display;

USE 5cloud_song_display;

CREATE TABLE songs
(

    Id INT
        NOT NULL
    AUTO_INCREMENT KEY,
    song_id VARCHAR
    (255) UNIQUE,
    song_name VARCHAR
    (255),
    artist_name VARCHAR
    (255),
    upload_time BIGINT,
    tag VARCHAR
    (255)
);
