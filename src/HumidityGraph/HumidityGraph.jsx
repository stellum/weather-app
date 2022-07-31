import React, { useContext } from "react";
import { BarChart, XAxis, Bar } from "recharts";
import { WeatherContext } from "../WeatherProvider/WeatherProvider";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const formatXAxis = (data) => `${new Date(data * 1000).getHours()}시`;

function BarGraph({ num }) {
  const { hourly } = useContext(WeatherContext);

  const CustomizedLabel = ({ x, y, value }) => {
    return (
      <text x={x + 30} y={y - 2} fontSize="15" textAnchor="middle">
        {value}
      </text>
    );
  };

  return (
    <BarChart
      width={960}
      height={200}
      data={hourly
        ?.slice(num * 12, (num + 1) * 12)
        .map(({ dt, humidity }) => ({ dt, humidity }))}
      margin={{ top: 30, right: 30, left: 30, bottom: 10 }}
    >
      <XAxis dataKey="dt" fontSize={15} tickFormatter={formatXAxis} />
      <Bar
        dataKey="humidity"
        fill="#2c6cff"
        isAnimationActive={false}
        label={CustomizedLabel}
      />
    </BarChart>
  );
}

const HumidityGraph = () => {
  const slides = [];

  for (let i = 0; i < 2; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <BarGraph num={i} />
      </SwiperSlide>
    );
  }
  return (
    <Swiper navigation={true} modules={[Navigation]}>
      {slides}
    </Swiper>
  );
};

export default HumidityGraph;
