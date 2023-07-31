const router = require('express').Router();
const path = require('path')

// // Import our modular routers for /notes
// const notesRouter = require('./apiroutes');

// const app = express();

// app.use('/notes', notesRouter);



// module.exports = app;

// the GET route for the notes page
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// the GET route for the home page
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = router;