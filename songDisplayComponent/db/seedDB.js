const mysql = require('mysql');
const fs = require('fs');
const csvParser = require('csv-parse');

// Create connection
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.HR_FRONTEND_MYSQL_PASSWORD,
  database: '5cloud_song_display',
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('\nConnected to the MySQL server.\n');
});

// Open seed csv file
const filePath = '/Users/jonathanolson/Downloads/5cloud Song List - Sheet1.csv';

let songs;

fs.readFile(
  filePath,
  {
    encoding: 'utf-8',
  },
  (err, csvData) => {
    if (err) {
      console.error(err);
    }

    csvParser(
      csvData,
      {
        columns: true,
        delimiter: ',',
      },
      (err, songs) => {
        if (err) {
          console.error(err);
        } else {
          //  Load into table 'songs'
          for (let i = 0; i < songs.length; i++) {
            // Convert string time to integer time
            const intTime = Date.parse(songs[i].date_posted);
            // Create query to insert each entry's information
            const query = `INSERT INTO songs (song_id, song_name, artist_name, upload_time, tag) VALUES ("${songs[i].song_id}", "${songs[i].song_name}", "${songs[i].artist_name}", "${intTime}", "${songs[i].tag}");`;
            // Insert information
            connection.query(query, (err, results, fields) => {
              if (err) {
                console.error(err);
              } else {
                console.log('Data successfully inserted in MySQL!!');
              }
            });
          }
        }
      }
    );
  }
);