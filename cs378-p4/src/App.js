import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://api.open-meteo.com/v1/forecast";
const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const DEFAULT_CITIES = [
  { name: "Dallas", lat: 32.7767, lon: -96.797 },
  { name: "Houston", lat: 29.7604, lon: -95.3698 },
  { name: "Austin", lat: 30.2672, lon: -97.7431 }
];

const WeatherApp = () => {
  const [cities, setCities] = useState(DEFAULT_CITIES);
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITIES[0]);
  const [weatherData, setWeatherData] = useState(null);
  const [newCity, setNewCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `${API_URL}?latitude=${city.lat}&longitude=${city.lon}&hourly=temperature_2m&timezone=auto`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (!data.hourly || !data.hourly.temperature_2m) {
        throw new Error("Invalid data structure from API");
      }
  
      setWeatherData(
        data.hourly.time.slice(0, 12).map((time, idx) => ({
          time: new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          temp: data.hourly.temperature_2m[idx],
        }))
      );
  
      setError("");
    } catch (err) {
      setError(`Failed to load weather data: ${err.message}`);
    }
  };
  

  const fetchCoordinates = async () => {
    try {
      const response = await fetch(`${GEO_API_URL}?name=${newCity}&count=1`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const cityData = data.results[0];
        const cityObj = { name: cityData.name, lat: cityData.latitude, lon: cityData.longitude };
        setCities([...cities, cityObj]);
        setSelectedCity(cityObj);
        setNewCity("");
      } else {
        setError(`Could not find weather for ${newCity}`);
      }
    } catch (err) {
      setError("Error fetching city coordinates.");
    }
  };

  return (
    <div className="weather-app">
      <div className="city-tabs">
        {cities.map((city, index) => (
          <button key={index} onClick={() => setSelectedCity(city)}>
            {city.name}
          </button>
        ))}
      </div>
      <div className="city-input">
        <input 
          type="text" 
          value={newCity} 
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchCoordinates}>+</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="weather-display">
        {weatherData ? (
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.time}</td>
                  <td>{entry.temp}°C</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
