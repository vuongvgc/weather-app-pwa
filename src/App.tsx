import React, { useState } from "react";
import { fetchWeatherOfCity } from "./API/fetchWeather";
import WeatherEntity from "./Modules";
import "./style/index.css";
function App() {
  const [query, setQuery] = useState("");
  const [weatherCity, setWeatherCity] = useState<WeatherEntity>();
  const search = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const data = await fetchWeatherOfCity(query);
      setWeatherCity(data);
      setQuery("");
    }
  };
  return (
    <div className="main-container">
      <input
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        onKeyPress={(e) => search(e)}
      />
      {weatherCity && (
        <div className="city">
          <h2 className="city-name">
            <span>{weatherCity?.name}</span>
            <sup>{weatherCity.sys?.country}</sup>
          </h2>
          <div className="city-temp">
            {weatherCity.main?.temp && Math.round(weatherCity.main?.temp)}
            <sup>&deg;C</sup>
          </div>

          <div className="infor">
            {weatherCity.weather && (
              <>
                <div className="city-icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherCity.weather[0].icon}@2x.png`}
                    alt={weatherCity.weather[0].description}
                  />
                </div>
                <p>
                  {weatherCity.weather && weatherCity.weather[0].description}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
