import React from "react";
import ReactDOM from "react-dom/client";
import WeatherApp from "./WeatherApp";
import WeatherProvider from "./WeatherProvider/WeatherProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WeatherProvider>
    <WeatherApp />
  </WeatherProvider>
);
