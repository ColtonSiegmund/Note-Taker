const router = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all notes
router.get('/notes', (req, res) => {
  return readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))
  )
  });

  // GET Route for retrieving specific note
  router.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((title) => title.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });
  // DELETE rout for deleting a specific note
  router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Making new array of all notes except the one with the ID provided in the URL
        const result = json.filter((title) => title.id !== noteId);
  
        // Save array to filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });

// POST Route for submitting notes
router.post('/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text ) {
    // Variable for the object we will save
    const newNotes = {
      title,
      text,
      id: uuidv4(),
    };
    // appending the new notes
    readAndAppend(newNotes, './db/db.json');
    // the response
    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in writing note!');
  }
});

module.exports = router;