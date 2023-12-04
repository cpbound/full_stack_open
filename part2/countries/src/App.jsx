import { useState, useEffect } from "react";
import countriesService from "./services/countriesService";
import Countries from "./components/Countries";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);


  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  useEffect(() => {
    countriesService.get().then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Find Countries</h1>
      <div>
        <input value={search} onChange={handleSearchChange} />
      </div>
      <Countries countries={countries} search={search} setSearch={setSearch} />
    </div>
  );
}

export default App;
