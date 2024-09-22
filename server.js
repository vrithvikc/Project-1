const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json())
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'internet_system',
  password:'2003',
  port: 5432,
});


app.post('/upload', upload.single('file'),   async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const minDelay = 2000; // Minimum delay in milliseconds (1 second)
  const maxDelay = 8000;
  const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  await delay(randomDelay); 
  console.log(`Received file: ${req.file.originalname}, size: ${req.file.size} bytes`);
  res.send('File uploaded successfully.');
});



// app.get('/download', async (req, res) => {
//   const filePath = path.join(__dirname, 'largefile');
//   fs.stat(filePath, async (err, stats) => {
//     if (err) {
//       return res.status(404).send('File not found.');
//     }

//     await delay(3000); // Add a 3-second delay

//     res.setHeader('Content-Length', stats.size);
//     res.setHeader('Content-Disposition', 'attachment; filename="largefile"');
    
//     const fileStream = fs.createReadStream(filePath);

//     fileStream.on('error', (streamErr) => {
//       console.error('Error reading file:', streamErr);
//       res.status(500).send('Error reading file.');
//     });

//     fileStream.pipe(res).on('error', (resErr) => {
//       console.error('Error sending file:', resErr);
//     }).on('close', () => {
//       console.log('File download completed.');
//     });
//   });
// });

app.get('/download',async (req, res) => {
  const blobSize = 100 * 1024 * 1024; // 100 MB
  const blob = Buffer.alloc(blobSize);
  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-Length': blobSize
  })
  const minDelay = 2000; // Minimum delay in milliseconds (1 second)
  const maxDelay = 8000;
  const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  await delay(randomDelay); 
  res.end(blob);
});

// const generateLargeFile = () => {
//   const filePath = path.join(__dirname, 'largefile');
//   if (!fs.existsSync(filePath)) {
//     const fileSize = 100 * 1024 * 1024; // 100 MB
//     const buffer = Buffer.alloc(fileSize);
//     fs.writeFileSync(filePath, buffer);
//     console.log('Large file created for download testing.');
//   }
// };

app.post("/results",async (req,res)=>{
  const {downloadSpeed,uploadSpeed,ping,ip} = req.body;
  try{
    const result = await pool.query(
      'INSERT INTO results (download_speed, upload_speed,ping,ip) VALUES ($1, $2,$3,$4) RETURNING *',
      [downloadSpeed, uploadSpeed,ping,ip]
    );
    res.status(200).json(result.rows[0]);
  }catch (err) {
    console.error('Error saving test results:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get("/history",async (req,res)=>{
  const {fromDate,toDate} = req.query;
  try{
    const query = `
            SELECT * FROM results
            WHERE test_date >= $1 AND test_date <= $2
            ORDER BY test_date DESC; 
        `;
        const values = [fromDate, toDate];
        const result = await pool.query(query, values);
        res.json(result.rows);
  }catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
}
})

app.head('/ping', (req, res) => {
  res.status(200).send();
});

app.get("/ip",(req,res)=>{
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  res.json({ ip: clientIp });
})

app.listen(port, () => {
  // generateLargeFile();
  console.log(`Server is running on http://localhost:${port}`);
});
