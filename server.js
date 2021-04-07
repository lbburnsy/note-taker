// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const { static } = require('express');

// Sets up the express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Does something to serve the CSS so that the server can render it
app.use(express.static('public'));

// A route for the homepage
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

// A route for the notes page
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

// A route for the notes api
app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "db/db.json")));

 // A route to post new notes
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    let id = uniqid();
    // console.log(newNote.title);
    // console.log(newNote.text);
})

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

