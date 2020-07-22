import React, { useState, useEffect } from "react";
import Weather from "./Weather";

const convertLargeNumToCardinalNum = (number) =>
  number >= 1e9
    ? number / 1e9 + "B"
    : number >= 1e6
    ? number / 1e6 + "M"
    : number >= 1e3
    ? number / 1e3 + "K"
    : number;

const Country = ({ country }) => {
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
      <h2>Weather in {country.capital}</h2>
      <Weather city={country.capital} />
    </div>
  );
};

export default Country;
