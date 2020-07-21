import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const URL = "https://restcountries.eu/rest/v2/all";
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleInput = (event) => {
    let str = event.target.value.trimLeft().toLowerCase();
    str.length > 3 && str.length > str.trim().length
      ? (str = str.trim() + " ")
      : (str = str.trim());
    setSearchTerm(str);
  };
  const CountryList = ({ countries, searchTerm }) => {
    var filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.trim())
    );
    if (
      searchTerm[searchTerm.length - 1] === " " &&
      filteredCountries.length > 1 &&
      filteredCountries.length < 10
    ) {
      filteredCountries = filteredCountries.filter(
        (country) => country.name.toLowerCase() === searchTerm.trim()
      );
    }

    if (filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries.sort()[0];
      return (
        <div>
          <h1>{country.name}</h1>
          <span>
            {country.capital} <br />
            {country.population} <br />
          </span>
          <h2>languages</h2>
          <ul>
            {country.languages.map((lang) => (
              <li key={lang.name}>{lang.name}</li>
            ))}
          </ul>
          <img src={country.flag} alt="flag of ${country.name}" width="200px" />
        </div>
      );
    } else {
      const countryList = filteredCountries.map((country) => (
        <span key={country.name}>
          {country.name}
          <br />
        </span>
      ));
      return <div>{countryList}</div>;
    }
  };

  const hook = () => {
    axios
      .get(URL)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log("promise failed, error: ", error));
  };

  useEffect(hook, []);
  return (
    <div>
      find countries <input onChange={handleInput} />
      <div className="countries"></div>
      <CountryList countries={countries} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
