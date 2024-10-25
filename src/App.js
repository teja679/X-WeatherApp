import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const API_KEY = 'c377d2f1207943fda19124951242510';
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWeatherData({});
    setError('');

    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName.toLowerCase()}`);
      setWeatherData(response.data.current);
      setCityName(''); // Reset city name input after fetching data
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={cityName}
          onChange={e => setCityName(e.target.value)}
          placeholder='Enter city name'
          required
        />
        <button type='submit'>Search</button>
      </form>

      <div className='weather-cards'>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            {error && <p className="error">{error}</p>}
            {Object.keys(weatherData).length > 0 && !error && (
              <>
                <section className='weather-card'>
                  <h4>Temperature</h4>
                  <p>{weatherData.temp_c}°C</p>
                </section>
                <section className='weather-card'>
                  <h4>Humidity</h4>
                  <p>{weatherData.humidity}%</p>
                </section>
                <section className='weather-card'>
                  <h4>Condition</h4>
                  <p>{weatherData.condition?.text}</p>
                </section>
                <section className='weather-card'>
                  <h4>Wind Speed</h4>
                  <p>{weatherData.wind_kph} kph</p>
                </section>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
