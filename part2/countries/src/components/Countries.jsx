import CountryStats from "./CountryStats";

const Countries = ({ countries, search }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <p>Too many countries, please specify filter</p>;
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <p>{country.name.common}</p>
        ))}
      </div>
    );
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <CountryStats country={filteredCountries[0]} />
      </div>
    )
  }
};

export default Countries;
