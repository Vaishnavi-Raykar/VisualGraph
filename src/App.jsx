// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bar, Pie } from 'react-chartjs-2';

// function App() {
//   const [weatherData, setWeatherData] = useState([]);
//   const [city, setCity] = useState('');

//   useEffect(() => {
//     fetchWeatherData();
//   }, []);

//   const fetchWeatherData = async () => {
//     const response = await axios.get('http://localhost:5173/weatherData');
//     setWeatherData(response.data);
//   };

//   const fetchWeather = async () => {
//     await axios.get(`http://localhost:5173/fetchWeather/${city}`);
//     fetchWeatherData();
//   };

//   const handleCityChange = (e) => {
//     setCity(e.target.value);
//   };

//   const handleFetchWeather = () => {
//     fetchWeather();
//   };

//   const barData = {
//     labels: weatherData.map((data) => data.city),
//     datasets: [
//       {
//         label: 'Temperature (°C)',
//         data: weatherData.map((data) => data.temperature),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   const pieData = {
//     labels: weatherData.map((data) => data.city),
//     datasets: [
//       {
//         label: 'Temperature (°C)',
//         data: weatherData.map((data) => data.temperature),
//         backgroundColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#FF6384',
//           '#36A2EB',
//         ],
//       },
//     ],
//   };

//   return (
//     <div>
//       <h1>Weather Data</h1>
//       <input
//         type="text"
//         value={city}
//         onChange={handleCityChange}
//         placeholder="Enter city"
//       />
//       <button onClick={handleFetchWeather}>Fetch Weather</button>
//       <Bar data={barData} />
//       <Pie data={pieData} />
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('');

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    const response = await axios.get('http://localhost:5000/weatherData');
    setWeatherData(response.data);
  };

  const fetchWeather = async () => {
    await axios.get(`http://localhost:5000/fetchWeather/${city}`);
    fetchWeatherData();
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleFetchWeather = () => {
    fetchWeather();
  };

  const barData = {
    labels: weatherData.map((data) => data.city),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weatherData.map((data) => data.temperature),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: weatherData.map((data) => data.city),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weatherData.map((data) => data.temperature),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
        ],
      },
    ],
  };

  return (
    <div>
      <h1>Weather Data</h1>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city"
      />
      <button onClick={handleFetchWeather}>Fetch Weather</button>
      <Bar data={barData} />
      <Pie data={pieData} />
    </div>
  );
}

export default App;
