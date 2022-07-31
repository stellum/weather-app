import React, { createContext, useEffect, useState } from "react";

export const WeatherContext = createContext({});

const WeatherProvider = ({ children }) => {
  const [weatherInfo, setWeatherInfo] = useState({});

  const VITE_API_KEY = import.meta.env.VITE_API_KEY;

  // 비동기 호출할때 async 사용
  const getWeather = async () => {
    try {
      const currentWeatherInfoAPI = `https://api.openweathermap.org/data/2.5/weather?appid=${VITE_API_KEY}&q=seoul&units=metric`;
      const currentWeatherInfo = await fetch(currentWeatherInfoAPI);
      const {
        name,
        coord: { lat, lon },
        main: { temp, humidity, feels_like, temp_max, temp_min },
        sys: { sunset, sunrise },
        weather: [{ main: weatherState }],
        wind: { speed, deg },
      } = await currentWeatherInfo.json();
      const hourlyWeatherInfoAPI = `https://api.openweathermap.org/data/2.5/onecall?appid=${VITE_API_KEY}&lat=${lat}&units=metric&lon=${lon}&exclude=current,minutely,daily`;
      const hourlyWeatherInfo = await fetch(hourlyWeatherInfoAPI);
      const { hourly } = await hourlyWeatherInfo.json();
      setWeatherInfo({
        name,
        temp,
        humidity,
        weatherState,
        feels_like,
        speed,
        deg,
        hourly,
        sunset,
        sunrise,
        temp_max,
        temp_min,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect 는 처음 마운트될때 무조건 실행됨
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <WeatherContext.Provider value={{ ...weatherInfo }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
