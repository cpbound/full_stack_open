import { useState, useEffect } from "react";
import countriesService from "./services/countriesService";
import Country from "./components/Country";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  useEffect(() => {
    countriesService.get().then((response) => {
      const filteredNames = response.data.map((country) =>
        country.name.common.toLowerCase()
      );
      setCountries(filteredNames);
    });
  }, []);

  useEffect(() => {
    const filter = countries.filter((name) =>
      name.includes(search.toLowerCase())
    );
    setFilteredCountries(filter);
  }, [search, countries]);

  return (
    <div className="App">
      <h1>Find Countries</h1>
      <div>
        <input value={search} onChange={handleSearchChange} />
      </div>
      <Country country={filteredCountries} />
    </div>
  );
}

export default App;
