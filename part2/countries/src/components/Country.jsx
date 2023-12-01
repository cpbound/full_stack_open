import { useState } from "react";
import CountryStats from "./CountryStats";

const Country = ({ country }) => {
  if (country.length > 10) {
    return <p>Too many countries, please specify filter</p>;
  } else if (country.length <= 10 && country.length > 1) {
    return country.map((e) => (
      <ul>
        <li>{e}</li>
      </ul>
    ));
  } else {
    return (
      <>
        <div>
          <CountryStats country={country} />
        </div>
      </>
    );
  }
};

export default Country;
