
import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const API_KEY = 'c377d2f1207943fda19124951242510';
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName.toLowerCase()}`);

      // console.log(response.data.current);

      setWeatherData({
        'Temperature': `${response.data.current.temp_c}°C`,
        'Humidity': `${response.data.current.humidity}%`,
        'Condition': `${response.data.current.condition.text}`,
        'Wind Speed': `${response.data.current.wind_kph} kph`,
      });
    } catch (err) {
      console.error('Failed to fetch weather data');
      alert('Failed to fetch weather data');
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' value={cityName} onChange={e => setCityName(e.target.value)} placeholder='Enter city name' required />
        <button type='submit'>Search</button>
      </form>
      <div className='details-div'>
        {loading ? <div>Loading data...</div>
          :
          <>
            {weatherData && Object.keys(weatherData).map(key => {
              return <section key={key} className='details-card'>
                <h4>{key}</h4>
                <p>{weatherData[key]}</p>
              </section>
            })}
          </>
        }
      </div>
    </div>
  );
}

export default App;

/* {
    "last_updated_epoch": 1729861200,
    "last_updated": "2024-10-25 18:30",
    "temp_c": 23.7,
    "temp_f": 74.7,
    "is_day": 0,
    "condition": {
        "text": "Clear",
        "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
        "code": 1000
    },
    "wind_mph": 5.8,
    "wind_kph": 9.4,
    "wind_degree": 303,
    "wind_dir": "WNW",
    "pressure_mb": 1011,
    "pressure_in": 29.87,
    "precip_mm": 0,
    "precip_in": 0,
    "humidity": 63,
    "cloud": 3,
    "feelslike_c": 25.3,
    "feelslike_f": 77.6,
    "windchill_c": 23.7,
    "windchill_f": 74.7,
    "heatindex_c": 25.3,
    "heatindex_f": 77.6,
    "dewpoint_c": 16.2,
    "dewpoint_f": 61.1,
    "vis_km": 10,
    "vis_miles": 6,
    "uv": 1,
    "gust_mph": 12.2,
    "gust_kph": 19.7
} */