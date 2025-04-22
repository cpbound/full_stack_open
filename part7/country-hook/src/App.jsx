import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) return;

    const getCountry = async () => {
      try {
        const res = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        );
        setCountry({ data: res.data, found: true });
      } catch (error) {
        console.log(error);
        setCountry({ data: null, found: false });
      }
    };

    getCountry();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  console.log(country);

  if (!country) {
    return null;
  } else if (!country.found) {
    return <div>Not found...</div>;
  } else if (country.found) {
    return (
      <div>
        <h3>{country.data.name.common} </h3>
        <div>Capital: {country.data.capital} </div>
        <div>Population: {country.data.population}</div>
        <img
          src={country.data.flags.png}
          height="100"
          alt={`flag of ${country.data.name.common}`}
        />
      </div>
    );
  }
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>Find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
