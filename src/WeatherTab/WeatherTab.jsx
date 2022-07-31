import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import HumidityGraph from "../HumidityGraph/HumidityGraph";
import WeatherGraph from "../WeatherGraph/WeatherGraph";
import WindGraph from "../WindGraph/WindGraph";
import "swiper/scss"; // core Swiper
import "swiper/scss/navigation"; // Navigation module

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value == index && <Box>{children}</Box>}
    </div>
  );
}

const WeatherTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="날씨"></Tab>
          <Tab label="습도"></Tab>
          <Tab label="바람"></Tab>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <WeatherGraph />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HumidityGraph />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WindGraph />
      </TabPanel>
    </Box>
  );
};

export default WeatherTab;
