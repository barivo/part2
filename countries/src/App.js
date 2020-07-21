import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const URL = "https://restcountries.eu/rest/v2/all";
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const convertLargeNumToCardinalNum = (number) =>
    number >= 1e9
      ? number / 1e9 + "B"
      : number >= 1e6
      ? number / 1e6 + "M"
      : number >= 1e3
      ? number / 1e3 + "K"
      : number;

  const handleInput = (event) => {
    let str = event.target.value.trimLeft().toLowerCase();
    str.length > 3 && str.length > str.trim().length
      ? (str = str.trim() + " ")
      : (str = str.trim());
    setSearchTerm(str);
  };
  const countryList = (countries, searchTerm) => {
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
    return filteredCountries;
  };
  const ShowCountry = ({ country }) => {
    return (
      <div>
        <h1>{country.name}</h1>
        <span>
          {country.capital} <br />
          {convertLargeNumToCardinalNum(country.population)} <br />
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
  };

  const ShowCountryList = ({ filteredCountries }) => {
    const [countryState, setCountryState] = useState("");

    if (filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries.sort()[0];
      return <ShowCountry country={country} />;
    } else {
      const countryList = filteredCountries.map((country) => (
        <span key={country.name}>
          {country.name}
          <button onClick={() => setCountryState(country.name)}>show</button>
          {countryState === country.name ? (
            <ShowCountry country={country} />
          ) : null}
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
  const filteredCountries = countryList(countries, searchTerm);
  return (
    <div>
      find countries <input onChange={handleInput} />
      <div className="countries"></div>
      {filteredCountries ? (
        <ShowCountryList filteredCountries={filteredCountries} />
      ) : null}
    </div>
  );
};

export default App;
