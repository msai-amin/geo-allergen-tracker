const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/allergens', async (req, res) => {
    const { lat, lon } = req.query;
    const apiKey = process.env.ALLERGEN_API_KEY;
    const apiUrl = `https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=${lat}&lng=${lon}`;
    
    try {
        const response = await fetch(apiUrl, {
            headers: { 'x-api-key': apiKey }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching allergen data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});