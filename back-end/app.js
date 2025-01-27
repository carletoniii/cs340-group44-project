/*
    SETUP
*/

// Express
var express = require("express");
var app = express();
PORT = 3000;

// Database
var db = require("./database/db-connector");

/*
    ROUTES
*/
app.get("/", function (req, res) {
  // Define our queries
  query1 = "DROP TABLE IF EXISTS diagnostic;";
  query2 =
    "CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);";
  query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
  query4 = "SELECT * FROM diagnostic;";

  // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

  // DROP TABLE...
  db.pool.query(query1, function (err, results, fields) {
    // CREATE TABLE...
    db.pool.query(query2, function (err, results, fields) {
      // INSERT INTO...
      db.pool.query(query3, function (err, results, fields) {
        // SELECT *...
        db.pool.query(query4, function (err, results, fields) {
          console.log(err);
          // Send the results to the browser
          let base = "<h1>MySQL Results:</h1>";
          res.send(base + JSON.stringify(results));
        });
      });
    });
  });
});

app.get("/:tableName", function (req, res) {
  // Define our queries
  var tableName = req.params.tableName;
  var query1 = "";
  switch (tableName) {
    case "Developers":
      var query1 =
        "SELECT idDeveloper AS 'ID', devName as 'Developer Name' FROM Developers;";
      break;
    case "Composers":
      var query1 =
        "SELECT idComposer AS 'ID', composerFName AS 'Composer First Name', composerLName AS 'Composer Last Name', spotifyMonthlyListenerCount AS 'Monthly Spotify Listeners' FROM Composers";
      break;
    case "Composers_Songs":
      var query1 =
        "SELECT Composers_Songs.idComposer as 'Composer ID', Composers.composerFName as 'Composer First Name', Composers.composerLName as 'Composer Last Name', Composers_Songs.idSong as 'Song ID', Songs.songName AS 'Song Name', Songs.spotifyPlayCount AS 'Spotify Plays' FROM Composers_Songs JOIN Composers ON Composers.idComposer = Composers_Songs.idComposer JOIN Songs on Composers_Songs.idSong = Songs.idSong ORDER BY Songs.spotifyPlayCount DESC";
      break;
    case "Composers_Developers":
      var query1 =
        "SELECT Composers_Developers.idComposer AS 'Composer ID', Composers.composerFName as 'Composer First Name', Composers.composerLName as 'Composer Last Name', Composers.spotifyMonthlyListenerCount AS 'Monthly Spotify Listeners', Composers_Developers.idDeveloper AS 'Developer ID', Developers.devName as 'Developer Name' FROM Composers_Developers JOIN Composers ON Composers_Developers.idComposer = Composers.idComposer JOIN Developers on Developers.idDeveloper = Composers_Developers.idDeveloper";
      break;
    case "Games":
      var query1 =
        "SELECT Games.idGame AS 'Game ID', Games.gameName AS 'Game Name', Games.idDeveloper AS 'Developer ID', Developers.devName AS 'Developer Name' FROM Games JOIN Developers on Developers.idDeveloper = Games.idDeveloper;";
      break;
    case "Games_Composers":
      var query1 =
        "SELECT Games_Composers.idGame AS 'Game ID', Games_Composers.idComposer AS 'Composer ID', Composers.composerFName as 'Composer First Name', Composers.composerLName as 'Composer Last Name', Composers.spotifyMonthlyListenerCount AS 'Monthly Spotify Listeners' FROM Games_Composers JOIN Games on Games.idGame = Games_Composers.idGame JOIN Composers on Composers.idComposer = Games_Composers.idComposer;";
      break;
    case "Songs":
      var query1 =
        "SELECT Songs.idSong AS 'Song ID', Songs.songName as 'Song Name', Songs.idGame as 'Game ID', Games.gameName AS 'Game Name', Songs.spotifyPlayCount AS 'Spotify Plays' FROM Songs JOIN Games on Games.idGame = Songs.idGame ORDER BY Songs.spotifyPlayCount DESC;";
      break;
  }
  console.log(`TableName: ${tableName} Query: ${query1}`);
  db.pool.query(query1, function (err, results, fields) {
    console.log(err, results);
    res.send(JSON.stringify(results));
  });
});
/*
    LISTENER
*/
app.listen(PORT, function () {
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});
