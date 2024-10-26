import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const API_KEY = 'c377d2f1207943fda19124951242510';
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName) return;

    setLoading(true);
    setWeatherData(null);
    setError('');

    try {
      const { data } = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName.toLowerCase()}`
      );
      setWeatherData(data.current);
      // setCityName('');
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="weather-cards">
        {error && <p className="error">{error}</p>}
        {weatherData && !loading && !error && (
          <>
            <section className="weather-card">
              <h4>Temperature</h4>
              <p>{weatherData.temp_c ?? 'N/A'}°C</p>
            </section>
            <section className="weather-card">
              <h4>Humidity</h4>
              <p>{weatherData.humidity ?? 'N/A'}%</p>
            </section>
            <section className="weather-card">
              <h4>Condition</h4>
              <p>{weatherData.condition?.text ?? 'N/A'}</p>
            </section>
            <section className="weather-card">
              <h4>Wind Speed</h4>
              <p>{weatherData.wind_kph ?? 'N/A'} kph</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
