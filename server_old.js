const express = require('express');
const crypto = require('crypto'); // To generate random strings
const app = express();
const PORT = 3001; // Choose a suitable port

// Middleware for handling file uploads
app.use(express.json({ limit: '10mb' })); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Generate the 10MB random string (do this once, on server start)
const randomString = crypto.randomBytes(100 * 1024 * 1024).toString('hex'); // 10MB

// app.post('/upload', (req, res) => {
//   console.log("upload")
//   if (req.body && req.body.data && req.body.data.length) {
//       res.status(200).json({ message: 'Upload successful' }); 
//   } else {
//       res.status(400).json({ error: 'Invalid upload data' });
//   }
// });

app.post('/upload', (req, res) => {
  const startTime = Date.now();

  if (req.body && req.body.data && req.body.data.length) {
      const endTime = Date.now();
      const durationInSeconds = (endTime - startTime) / 1000;
      const dataSizeInMB = req.body.data.length / (1024 * 1024);
      const uploadSpeed = dataSizeInMB / durationInSeconds;

      res.status(200).json({ message: 'Upload successful', speed: uploadSpeed });
  } else {
      res.status(400).json({ error: 'Invalid upload data' });
  }
});

// Download Endpoint
app.get('/download', (req, res) => {
  console.log("download")
  res.set('Content-Type', 'text/plain');
  res.send(randomString);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
