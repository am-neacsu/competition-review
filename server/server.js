// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const files = {
  judges: 'judges.json',
  competitors: 'competitors.json',
  reviews: 'reviews.json',
  categories: 'categories.json'
};

app.use(cors());
app.use(express.json());

// Load all data
app.get('/load', (req, res) => {
  try {
    const data = {};
    for (const key in files) {
      const filePath = path.join(DATA_DIR, files[key]);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath);
        data[key] = JSON.parse(content);
      } else {
        data[key] = [];
      }
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading data');
  }
});

// Save all data
app.post('/save', (req, res) => {
  try {
    const incomingData = req.body;
    for (const key in incomingData) {
      if (files[key]) {
        const filePath = path.join(DATA_DIR, files[key]);
        fs.writeFileSync(filePath, JSON.stringify(incomingData[key], null, 2));
      }
    }
    res.send('Data saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
