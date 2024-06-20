// import React, { useEffect } from 'react'
// import './Weather.css'
// import search_icon from '../assets/search.png'
// import clear_icon from '../assets/clear.png'
// import cloud_icon from '../assets/cloud.png'
// import drizzle_icon from '../assets/drizzle.png'
// import rain_icon from '../assets/rain.png'
// import snow_icon from '../assets/snow.png'
// import wind_icon from '../assets/wind.png'
// import humidity_icon from '../assets/humidity.png'

// const Weather = () => {


// const search = async (city)=>{

//   try{
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;

// const response = await fetch(url);
// const data = await response.json();
// console.log(data);

//   } catch (error){

//   }
// }

// useEffect(()=>{
//   search("London");

// },[])

//   return (
//     <div className='weather' >
//       <div className="search-bar">
//         <input type="text" placeholder='Search' />
//         <img src={search_icon} alt="" />
//       </div>

//       <img src={clear_icon} alt="" className='weather-icon' />
//       <p className='temperature'>16°c</p>
//       <p className='location'>London</p>
//       <div className="weather-data">
//         <div className="col">
//           <img src={humidity_icon} alt="" />
//           <div>
//             <p>91 %</p>
//             <span>Humidity</span>
//           </div>
//         </div>
//         <div className="col">
//           <img src={wind_icon} alt="" />
//           <div>
//             <p>3.6 lm/h</p>
//             <span>Wind speed</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Weather


import React, { useState, useEffect } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [error, setError] = useState('');

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  const handleSearch = () => {
    if (city.trim() !== '') {
      search(city);
    }
  };

  return (
    <div className='weather'>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder='Search' 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
        />
        <img src={search_icon} alt="search" onClick={handleSearch} />
      </div>

      {error && <p className='error'>{error}</p>}
      {weatherData && (
        <>
          <img src={clear_icon} alt="weather-icon" className='weather-icon' />
          <p className='temperature'>{weatherData.main.temp}°c</p>
          <p className='location'>{weatherData.name}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherData.main.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind speed" />
              <div>
                <p>{weatherData.wind.speed} m/s</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
