// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

// Sets up the express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// A route for the homepage
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

// A route for the notes page
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "notes.html")));

// A route for the notes api
app.get("/api/notes", (req, res) => res.json(notes));

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
