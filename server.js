const express = require('express');
const app = express();
const port = 3000; // Set the desired port number

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error('API key not found. Please set the API_KEY environment variable.');
  process.exit(1);
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/key', (req, res) => {
  res.json({ key: apiKey });
});

app.use(express.static('/'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*const express = require("express");
const app = express();
const path = require("path");

// Serve static files from the 'aichat' directory
app.use(express.static(path.join(__dirname, "/")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/", "index.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/