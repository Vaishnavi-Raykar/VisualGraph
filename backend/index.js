//instead of using require use import to not get error . like i used below
import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors';
// const dotenv = require('dotenv');
// const result = dotenv.config();


const app = express();
// here the server port 5000 . use command 'nodemon' to run server in another terminal.
// means when we fetch url from  frontend  , it must be like http://localhost:5000//xyz?name=abc...  , here see 5000 port number
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));




const TemperatureSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  date: {
    type: [Date],
    required: true
},
temp: {
    type: [Number],
    required: true
}
});

const Temperature = mongoose.model('Temperature', TemperatureSchema);

// app.get('/temperatures', async (req, res) => {
//   try {
//       const temperatures1 = await Temperature.find();
//       console.log(temperatures1)
//       const temperatures = temperatures1.reverse();
//       res.json(temperatures);
//   } catch (err) {
//       res.status(500).send(err);
//   }
// });

app.get('/temperatures', async (req, res) => {
  try {
      console.log('Endpoint hit');  // Log to indicate the endpoint was hit
      const temperatures1 = await Temperature.find();
      console.log('Data retrieved:', temperatures1);  // Log the retrieved data
      const temperatures = temperatures1.reverse();
      res.json(temperatures);
  } catch (err) {
      console.error('Error:', err);  // Log the error
      res.status(500).send(err);
  }
});


app.post('/temperatures', async (req, res) => {
  const { city,date, temp } = req.body;
  const newTemperature = new Temperature({ cityName,date, temp });
  try {
      const savedTemperature = await newTemperature.save();
      res.json(savedTemperature);
  } catch (err) {
      res.status(500).send(err);
  }
});

// below is api route to get information about wather in upcoming 5 days
app.get('/fetchWeather/:city', async (req, res) => {
  const city = req.params.city;
  // here is api key get from  - https://www.weatherapi.com/
  // use your own api key
  // const apiKey = process.env.WEATHER_API_KEY;
  const apiKey = '0fb0e2ecc852427b95684541242905';
  // see url i used - forcast in it. also days=5 .
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    // this will give all data of weather
    res.json({
      forecast: weatherData.forecast.forecastday,
      location: weatherData.location.name
  });
    // this will give only data of 5 days weather
  } catch (error) {
    res.status(500).send(error);
  }
});


// City suggestion endpoint
// app.get('/cities', async (req, res) => {
//   const query = req.query.query;
//   try {
//     const apiKey = process.env.WEATHER_API_KEY || '0fb0e2ecc852427b95684541242905';
//     const url = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;
//     const response = await axios.get(url);
//     const cityData = response.data;
//     const cities = cityData.map(city => ({
//       id: city.id,
//       name: city.name
//     }));
//     res.json(cities);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});













// //instead of using require use import to not get error . like i used below
// import express from 'express';
// import mongoose from 'mongoose';
// import axios from 'axios';
// import cors from 'cors';
// // const dotenv = require('dotenv');
// // const result = dotenv.config();


// const app = express();
// // here the server port 5000 . use command 'nodemon' to run server in another terminal.
// // means when we fetch url from  frontend  , it must be like http://localhost:5000//xyz?name=abc...  , here see 5000 port number
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));




// const TemperatureSchema = new mongoose.Schema({
//   cityName: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: [Date],
//     required: true
// },
// temp: {
//     type: [Number],
//     required: true
// }
// });

// const Temperature = mongoose.model('Temperature', TemperatureSchema);

// // app.get('/temperatures', async (req, res) => {
// //   try {
// //       const temperatures1 = await Temperature.find();
// //       console.log(temperatures1)
// //       const temperatures = temperatures1.reverse();
// //       res.json(temperatures);
// //   } catch (err) {
// //       res.status(500).send(err);
// //   }
// // });

// app.get('/temperatures', async (req, res) => {
//   try {
//       console.log('Endpoint hit');  // Log to indicate the endpoint was hit
//       const temperatures1 = await Temperature.find();
//       console.log('Data retrieved:', temperatures1);  // Log the retrieved data
//       const temperatures = temperatures1.reverse();
//       res.json(temperatures);
//   } catch (err) {
//       console.error('Error:', err);  // Log the error
//       res.status(500).send(err);
//   }
// });


// app.post('/temperatures', async (req, res) => {
//   const { cityName,date, temp } = req.body;
//   const newTemperature = new Temperature({ cityName,date, temp });
//   try {
//       const savedTemperature = await newTemperature.save();
//       res.json(savedTemperature);
//   } catch (err) {
//       res.status(500).send(err);
//   }
// });

// // below is api route to get information about wather in upcoming 5 days
// app.get('/fetchWeather/:city', async (req, res) => {
//   const city = req.params.city;
//   // here is api key get from  - https://www.weatherapi.com/
//   // use your own api key
//   // const apiKey = process.env.WEATHER_API_KEY;
//   const apiKey = '0fb0e2ecc852427b95684541242905';
//   // see url i used - forcast in it. also days=5 .
//   const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;

//   try {
//     const response = await axios.get(url);
//     const weatherData = response.data;
//     // this will give all data of weather
//     res.json({
//       forecast: weatherData.forecast.forecastday,
//       location: weatherData.location.name
//   });
//     // this will give only data of 5 days weather
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });


// // City suggestion endpoint
// app.get('/cities', async (req, res) => {
//   const query = req.query.query;
//   try {
//     const apiKey = process.env.WEATHER_API_KEY || '0fb0e2ecc852427b95684541242905';
//     const url = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;
//     const response = await axios.get(url);
//     const cityData = response.data;
//     const cities = cityData.map(city => ({
//       id: city.id,
//       name: city.name
//     }));
//     res.json(cities);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });