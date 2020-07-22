import React, { useState, useEffect } from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY;

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({});

  const hook = () => {
    // http://api.weatherstack.com/current?access_key=ea19f622aa3a679655abadcb91ef0533&query=New%20York
    const params = {
      access_key: api_key,
      query: city,
    };
    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) =>
        response.data.success === false
          ? setWeather(null)
          : setWeather(response.data.current)
      )
      .catch((error) => {
        console.log("failed to fetch weather from api, error: ", error);
      });
  };
  useEffect(hook, []);
  console.log(weather, "outside hook");
  return <div>{weather ? weather.temperature : null}</div>;
};
export default Weather;
