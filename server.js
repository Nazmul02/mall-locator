const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const GOOGLE_PLACES_API_KEY = 'AIzaSyDke0_DXrIVdG_3p4iZjIQeEl72pngSvGU';
// Replace with your API key

app.get("/api/nearby-malls", async (req, res) => {
    const { lat, lng } = req.query;
    const radius = 5000;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=shopping_mall&key=${GOOGLE_PLACES_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from Google Places API" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});