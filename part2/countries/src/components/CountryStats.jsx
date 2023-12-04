import { useState, useEffect } from "react";
import weatherService from "../services/weatherService";

const CountryStats = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    weatherService.get(country.capital).then((response) => {
      setWeather(response.data);
    });
  }, []);

  return (
    <>
      {weather.main ? (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} km²</p>
          <h2>Languages:</h2>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <div>
            <img src={country.flags.png} alt={country.flag} />
          </div>
          <div>
            <h1>Weather in {weather.name}</h1>
            <p>Temperature: {weather.main.temp}°C</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
            />
            <p>Wind: {weather.wind.speed}mph</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CountryStats;
