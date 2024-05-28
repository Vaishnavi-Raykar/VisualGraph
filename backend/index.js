const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/weatherDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  description: String,
  date: Date,
});

const Weather = mongoose.model('Weather', weatherSchema);

// Fetch weather data from API
app.get('/fetchWeather/:city', async (req, res) => {
  const city = req.params.city;
  const apiKey = 'WEATHER_API_KEY'; // Replace with your actual API key
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    const newWeather = new Weather({
      city: weatherData.location.name,
      temperature: weatherData.current.temp_c,
      description: weatherData.current.condition.text,
      date: new Date(),
    });

    await newWeather.save();
    res.json(newWeather);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get weather data from MongoDB
app.get('/weatherData', async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.json(weatherData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
