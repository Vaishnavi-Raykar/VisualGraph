// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Line, Bar, Pie } from "react-chartjs-2";
// import "chart.js/auto";
// import HeatMap from "react-heatmap-grid";
// import { City, Country, State } from "country-state-city";
// import Selector from "./Selector";


// function App() {
//   const [date, setDate] = useState([]);
//   const [temp, setTemp] = useState([]);
//   const [city, setCity] = useState("");
//   const [cityName, setCityName] = useState("");
//   const [historyData, setHistoryData] = useState([]);
//   const [showHistory, setShowHistory] = useState(false); // New state variable

//   let countryData = Country.getAllCountries();
//   const [stateData, setStateData] = useState();
//   const [cityData, setCityData] = useState();

//   const [country, setCountry] = useState(countryData[0]);
//   const [state, setState] = useState();
//   // const [city, setCity] = useState();

//   useEffect(() => {
//     setStateData(State.getStatesOfCountry(country?.isoCode));
//   }, [country]);

//   useEffect(() => {
//     setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
//   }, [state]);

//   useEffect(() => {
//     stateData && setState(stateData[0]);
//   }, [stateData]);

//   useEffect(() => {
//     cityData && setCity(cityData[0]);
//   }, [cityData]);


//   //to call the function automatically 
//   useEffect(() => {
//     fetchHistoryData();
//   }, []);

//   const fetchHistoryData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/temperatures");
//       setHistoryData(response.data);
//     } catch (error) {
//       console.error("Error fetching history data:", error);
//     }
//   };

//   const fetchWeather = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/fetchWeather/${city}`
//       );
//       console.log("This is the response", response);

//       const data = response.data.forecast;
//       const Cityname = response.data.location;
//       console.log("response data :", response.data);
//       console.log("only data :", data);


//       const names = data.map((obj) => obj.date); 
//       const temp = data.map((obj) => obj.day.avgtemp_c);
//       console.log(temp, "weather");

//       setDate(names);
//       setTemp(temp);
//       setCityName(Cityname);

//       // Automatically store data in MongoDB after fetching weather data
//       addTemperature(Cityname, names, temp);
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//     }
//   };

//   const handleCityChange = (e) => {
//     setCity(e.target.value);
//   };

//   const handleFetchWeather = () => {
//     fetchWeather();
//   };

//   const addTemperature = async (cityName, date, temp) => {
//     try {
//       console.log("Add Temperature");
//       console.log(cityName, date, temp);
//       const response = await axios.post("http://localhost:5000/temperatures", {
//         cityName,
//         date,
//         temp,
//       });
//       fetchHistoryData();
//     } catch (error) {
//       console.error("Error adding temperature:", error);
//     }
//   };

//   const minTemp = Math.floor(Math.min(...temp));
//   const maxTemp = Math.ceil(Math.max(...temp));
//   const yMin = minTemp - 1;
//   const yMax = maxTemp + 1;

//   const chartData = {
//     labels: date,
//     datasets: [
//       {
//         label: "Average Temperature (°C)",
//         data: temp,
//         fill: false,
//         backgroundColor: "rgba(75,192,192,0.2)",
//         borderColor: "rgba(75,192,192,1)",
//       },
//     ],
//   };

//   const chartData1 = {
//     labels: date,
//     datasets: [
//       {
//         label: "Average Temperature (°C)",
//         data: temp,
//         backgroundColor: "rgba(255,99,71,1)",
//         borderColor: "rgba(255,255,255,1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const pieData = {
//     labels: date,
//     datasets: [
//       {
//         label: "Average Temperature (°C)",
//         data: temp,
//         backgroundColor: date.map(() => {
//           const r = Math.floor(Math.random() * 255);
//           const g = Math.floor(Math.random() * 255);
//           const b = Math.floor(Math.random() * 255);
//           return `rgba(${r},${g},${b},0.6)`;
//         }),
//         borderColor: date.map(() => {
//           const r = Math.floor(Math.random() * 255);
//           const g = Math.floor(Math.random() * 255);
//           const b = Math.floor(Math.random() * 255);
//           return `rgba(${r},${g},${b},1)`;
//         }),
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Date",
//         },
//       },
//       y: {
//         min: yMin,
//         max: yMax,
//         title: {
//           display: true,
//           text: "Temperature (°C)",
//         },
//         ticks: {
//           maxRotation: 90,
//           minRotation: 90,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//     },
//   };

//   const xLabels = date;
//   const yLabels = ["Temperature"];
//   const heatmapData = [temp];

//   // New function to handle the click event
//   const toggleHistoryData = () => {
//     setShowHistory(!showHistory);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Weather Data</h1>
//       <div className="flex justify-center mb-6">
//         {/* <input
//           type="text"
//           value={city}
//           onChange={handleCityChange}
//           placeholder="Enter city"
//           className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 mr-4"
//         /> */}

// <section className="h-80 rounded-md px-3 grid place-items-center pb-20 selection:text-white selection:bg-teal-500 bg-gradient-to-r from-teal-400 to-teal-500">
//       <div>
//         <h2 className="text-2xl font-bold text-teal-900">
//           Country, State and City Selectors
//         </h2>
//         <br />
//         <div className="flex flex-wrap gap-3 bg-teal-300 rounded-lg p-8">
//           <div>
//             <p className="text-teal-800 font-semibold">Country :</p>
//             <Selector
//               data={countryData}
//               selected={country}
//               setSelected={setCountry}
//             />
//           </div>
//           {state && (
//             <div>
//               <p className="text-teal-800 font-semibold">State :</p>
//               <Selector
//                 data={stateData}
//                 selected={state}
//                 setSelected={setState}
//               />
//             </div>
//           )}
//           {city && (
//             <div>
//               <p className="text-teal-800 font-semibold">City :</p>
//               <Selector data={cityData} selected={city} setSelected={setCity} />
//             </div>
//           )}
//         </div>
//       </div>
//       </section>
//         <button
//           onClick={handleFetchWeather}
//           className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
//         >
//           Fetch Weather
//         </button>
//       </div>
//       {cityName && (
//         <h2 className="text-2xl font-bold text-center">
//           Weather Forecast for {cityName}...
//         </h2>
//       )}
//       <div className="flex flex-col gap-5 items-center justify-between ">
//         <div className="flex flex-row w-full gap-20 justify-center max-md:flex-col max-md:justify-center max-md:items-center max-md:w-full  max-sm:flex-col ">
//           <div className="bg-white p-4 rounded-lg shadow-md w-1/3 border border-gray-500 max-lg:w-1/2 max-md:w-[75%] max-sm:w-full max-md:flex-col max-md:justify-center ">
//             <h1 className="mb-20 text-2xl font-bold flex flex-row justify-center ">
//               Bar Graph
//             </h1>
//             <Bar data={chartData1} options={chartOptions} />
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-md w-1/3 border border-gray-500 max-lg:w-1/2  max-md:w-[75%] max-sm:w-full max-md:flex-col max-md:justify-center">
//             <h1 className="mb-20 text-2xl font-bold flex flex-row justify-center">
//               Line Graph
//             </h1>
//             <Line data={chartData} />
//           </div>
//         </div>
//         <div className="flex flex-row w-full gap-20 justify-center max-md:flex-col max-md:justify-center max-md:items-center max-md:w-full  max-sm:flex-col ">
//           <div className="bg-white p-4 rounded-lg shadow-md w-1/3 border border-gray-500 max-lg:w-1/2 max-md:w-[75%] max-sm:w-full max-md:flex-col max-md:justify-center ">
//             <h1 className="mb-10 text-2xl font-bold flex flex-row justify-center">
//               Pie Chart
//             </h1>
//             <Pie data={pieData} />
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-md w-1/3 border border-gray-500  max-lg:w-1/2 max-md:w-[75%] max-sm:w-full max-md:flex-col max-md:justify-center">
//             <h1 className="mb-10 text-2xl font-bold flex flex-row justify-center">
//               Heat-Map
//             </h1>
//             <HeatMap
//               xLabels={xLabels}
//               yLabels={yLabels}
//               data={heatmapData}
//               squares
//               height={50}
//               yLabelWidth={50}
//               xLabelWidth={20}
              
//             />
//           </div>
//         </div>
//       </div>
//       <div className="mt-8 max-md:mt-20 flex flex-col justify-center items-center w-full">
//         <h2
//           className="text-2xl font-bold mb-4 cursor-pointer flex justify-center "
//           onClick={toggleHistoryData} // Added onClick event
//         >
//           History Data➡️ 
//         </h2>
//         {showHistory && ( // Conditionally render the history data
//           <table className="table-auto ">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2">City</th>
//                 <th className="px-4 py-2">Date</th>
//                 <th className="px-4 py-2">Temperature (°C)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {historyData.map((record, index) => (
//                 <tr key={index}>
//                   <td className="border px-4 py-2">{record.cityName}</td>
//                   <td className="border px-4 py-2">
//                     {record.date.map((date, dateIndex) => (
//                       <div key={dateIndex} className="py-1">
//                         {date.substring(0, 10)}
//                       </div>
//                     ))}
//                   </td>
//                   <td className="border px-4 py-2">
//                     {record.temp.map((temperature, tempIndex) => (
//                       <div key={tempIndex} className="py-1">
//                         {temperature}
//                       </div>
//                     ))}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }
// export default App;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import HeatMap from "react-heatmap-grid";
import { City, Country, State } from "country-state-city";
import Selector from "./Selector";


function App() {
  const [date, setDate] = useState([]);
  const [temp, setTemp] = useState([]);
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // New state variable

  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState();
  // const [city, setCity] = useState();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
    // console.log(city);
  }, [cityData]);

  useEffect(() => {
    console.log(city);
  },[city])

  //to call the function automatically 
  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/temperatures");
      setHistoryData(response.data);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/fetchWeather/${city}`
      );
      // console.log("This is the cityName", cityName);
      console.log("This is the response", response);

      const data = response.data.forecast;
      const Cityname = response.data.location;
      console.log("response data :", response.data);
      console.log("only data :", data);


      const names = data.map((obj) => obj.date); 
      const temp = data.map((obj) => obj.day.avgtemp_c);
      console.log(temp, "weather");

      setDate(names);
      setTemp(temp);
      setCityName(Cityname);

      // Automatically store data in MongoDB after fetching weather data
      addTemperature(Cityname, names, temp);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleFetchWeather = () => {
    fetchWeather();
  };

  const addTemperature = async (city, date, temp) => {
    try {
      console.log("Add Temperature");
      console.log(city, date, temp);
      const response = await axios.post("http://localhost:5000/temperatures", {
        city,
        date,
        temp,
      });
      fetchHistoryData();
    } catch (error) {
      console.error("Error adding temperature:", error);
    }
  };

  const minTemp = Math.floor(Math.min(...temp));
  const maxTemp = Math.ceil(Math.max(...temp));
  const yMin = minTemp - 1;
  const yMax = maxTemp + 1;

  const chartData = {
    labels: date,
    datasets: [
      {
        label: "Average Temperature (°C)",
        data: temp,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const chartData1 = {
    labels: date,
    datasets: [
      {
        label: "Average Temperature (°C)",
        data: temp,
        backgroundColor: "rgba(255,99,71,1)",
        borderColor: "rgba(255,255,255,1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: date,
    datasets: [
      {
        label: "Average Temperature (°C)",
        data: temp,
        backgroundColor: date.map(() => {
          const r = Math.floor(Math.random() * 255);
          const g = Math.floor(Math.random() * 255);
          const b = Math.floor(Math.random() * 255);
          return `rgba(${r},${g},${b},0.6)`;
        }),
        borderColor: date.map(() => {
          const r = Math.floor(Math.random() * 255);
          const g = Math.floor(Math.random() * 255);
          const b = Math.floor(Math.random() * 255);
          return `rgba(${r},${g},${b},1)`;
        }),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        min: yMin,
        max: yMax,
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        ticks: {
          maxRotation: 90,
          minRotation: 90,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  const xLabels = date;
  const yLabels = ["Temperature"];
  const heatmapData = [temp];

  // New function to handle the click event
  const toggleHistoryData = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Weather Data</h1>
      <div className="flex justify-center mb-6">
        {/* <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 mr-4"
        /> */}

<section className="h-80 rounded-md px-3 grid place-items-center pb-20 selection:text-white selection:bg-teal-500 bg-gradient-to-r from-teal-400 to-teal-500">
      <div>
        <h2 className="text-2xl font-bold text-teal-900">
          Country, State and City Selectors
        </h2>
        <br />
        <div className="flex flex-wrap gap-3 bg-teal-300 rounded-lg p-8">
          <div>
            <p className="text-teal-800 font-semibold">Country :</p>
            <Selector
              data={countryData}
              selected={country}
              setSelected={setCountry}
            />
          </div>
          {state && (
            <div>
              <p className="text-teal-800 font-semibold">State :</p>
              <Selector
                data={stateData}
                selected={state}
                setSelected={setState}
              />
            </div>
          )}
          {city && (
            <div>
              <p className="text-teal-800 font-semibold">City :</p>
              <Selector data={cityData} selected={city} setSelected={setCity} />
            </div>
          )}
        </div>
      </div>
      </section>
        <button
          onClick={handleFetchWeather}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Fetch Weather
        </button>
      </div>
      {city && (
        <h2 className="text-2xl font-bold text-center">
          Weather Forecast for {city}...
        </h2>
      )}
      <div className="flex flex-col gap-5 items-center justify-between ">
        <div className="flex flex-row w-full gap-20 justify-center max-md:flex-col max-md:justify-center max-md:items-center max-md:w-full  max-sm:flex-col ">
          <div className="bg-white p-4 rounded-lg shadow-md w-1/3 border border-gray-500 max-lg:w-1/2 max-md:w-[75%] max-sm:w-full max-md:flex-col max-md:justify-center ">
            <h1 className="mb-20 text-2xl font-bold flex flex-row justify-center ">
              Bar Graph
            </h1>
            <Bar data={chartData1} options={chartOptions} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-1/3 border border-gray-500 max-lg:w-1/2  max-md:w-[75%] max-sm:w-full max-md:flex-col max-md:justify-center">
            <h1 className="mb-20 text-2xl font-bold flex flex-row justify-center">
              Line Graph
            </h1>
            <Line data={chartData} />
          </div>
        </div>
        <div className="flex flex-row w-full gap-20 justify-center max-md:flex-col max-md:justify-center max-md:items-center max-md:w-full  max-sm:flex-col ">
          <div className="bg-white p-4 rounded-lg shadow-md w-1/3 border border-gray-500 max-lg:w-1/2 max-md:w-[75%] max-sm:w-full max-md:flex-col max-md:justify-center ">
            <h1 className="mb-10 text-2xl font-bold flex flex-row justify-center">
              Pie Chart
            </h1>
            <Pie data={pieData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-1/3 border border-gray-500  max-lg:w-1/2 max-md:w-[75%] max-sm:w-full max-md:flex-col max-md:justify-center">
            <h1 className="mb-10 text-2xl font-bold flex flex-row justify-center">
              Heat-Map
            </h1>
            <HeatMap
              xLabels={xLabels}
              yLabels={yLabels}
              data={heatmapData}
              squares
              height={50}
              yLabelWidth={50}
              xLabelWidth={20}
              
            />
          </div>
        </div>
      </div>
      <div className="mt-8 max-md:mt-20 flex flex-col justify-center items-center w-full">
        <h2
          className="text-2xl font-bold mb-4 cursor-pointer flex justify-center "
          onClick={toggleHistoryData} // Added onClick event
        >
          History Data➡️ 
        </h2>
        {showHistory && ( // Conditionally render the history data
          <table className="table-auto ">
            <thead>
              <tr>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Temperature (°C)</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((record, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{record.city}</td>
                  <td className="border px-4 py-2">
                    {record.date.map((date, dateIndex) => (
                      <div key={dateIndex} className="py-1">
                        {date.substring(0, 10)}
                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    {record.temp.map((temperature, tempIndex) => (
                      <div key={tempIndex} className="py-1">
                        {temperature}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
