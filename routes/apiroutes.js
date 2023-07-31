const router = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving notes
router.get('/notes', (req, res) => {
  return readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))
    // .then((notes)=> {
    //   return res.json(notes)
    // }) 
  )
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
    };

    readAndAppend(newNotes, './db/db.json');

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