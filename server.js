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

// Need a route to populate notes
app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, notes) => {
        if (err) throw err;
        res.json(JSON.parse(notes));
    })
})

 // A route to post new notes
app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, response) => {
        if (err) throw err;
        let notesArray = JSON.parse(response);
        const noteInput = req.body;
        const id = uniqid();
        const newNote = {
            id: id,
            title: noteInput.title,
            text: noteInput.text
        };
        notesArray.push(newNote);
        res.json(newNote);
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notesArray), (err) => {
            if (err) throw err;
        });
    });
});

// A route to delete new notes
app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    fs.readFile("db/db.json", "utf8", (err, response) => {
        if (err) throw err;
        let notesArray = JSON.parse(response);
        for (let i = 0; i < notesArray.length; i++) {
            if (notesArray[i].id === id) {
                notesArray.splice(notesArray[i],1);
            }
        }
        res.json(notesArray);
        fs.writeFile("db/db.json", JSON.stringify(notesArray), (err) => {
            if (err) throw err;
        })
    })
})

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

