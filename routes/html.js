const router = require('express').Router();
const path = require('path')


// the GET route for the notes page
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// the GET route for the home page
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = router;