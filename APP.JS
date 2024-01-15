const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define routes

// Home page with video upload form
app.get('/', (req, res) => {
  res.render('upload');
});

// Handle video uploads
app.post('/upload', upload.single('video'), (req, res) => {
  // Redirect to the videos page after successful upload
  res.redirect('/videos');
});

// Videos page to display uploaded videos
app.get('/videos', (req, res) => {
  // Get the list of uploaded videos (you can modify this based on your storage)
  const videos = ['video1.mp4', 'video2.mp4', 'video3.mp4'];

  res.render('videos', { videos });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
