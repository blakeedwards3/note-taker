const express = require('express');
const fs = require ("fs");
const path = require('path');
const router = require('express').Router();

// Reads the notes from the JSON file
function getNotes() {
    const data = fs.readFileSync(
        path.join(__dirname, '../db/db.json'),
        'utf8'
    );
    return JSON.parse(data);
}

// Writes notes to the JSON file
function saveNotes(notes) {
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes),
        'utf8'
    );
}

// Get all the notes
router.get('/notes', (req, res) => {
    const notes = getNotes();
    res.status(200).json(notes);
});

// Creates a new note
router.post('/notes', (req, res) => {
    const notes = getNotes();
    const newNote = req.body;
    newNote.id = Date.now();
    notes.push(newNote);
    saveNotes(notes);
    res.json(newNote);
});

// Deletes notes
router.delete('/notes/:id', (req, res) => {
    const notes = getNotes();
    const noteId = parseInt(req.params.id);
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    saveNotes(updatedNotes);
    res.sendStatus(204);
});

module.exports = router;