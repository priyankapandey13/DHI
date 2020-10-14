import React, { useState, useEffect } from "react";
import "./Home.css";
import { Box, Container } from "@material-ui/core";

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import Space from "./space";

// lets suppose this is the array of objects i am getting from my global state.
const SelectedCordinates = [{ latitude: 55.6761, longitude: 12.5683 }];

const apiURL = SelectedCordinates.map((coordinates) => {
  const currentURL = `https://api.met.no/weatherapi/locationforecast/2.0/complete?altitude=0&lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  return currentURL;
});

function convertTime(time) {
  const TimeWithoutPM = parseInt(time.split(":")[0]) + 12;
  const Time24hrWithPM = TimeWithoutPM + " pm";
  return Time24hrWithPM;
}

function removeExtra00(time) {
  const TimeWithoutAM = time.split(":")[0];
  const TimeWithAM = TimeWithoutAM + " am";
  return TimeWithAM;
}

function Time() {
  const [graphdata, setgraphdata] = useState([]);
  const [graphtime, setgraphtime] = useState({});

  async function fetchTimeData() {
    try {
      const response = await fetch(apiURL);
      const json = await response.json();

      const timelist = json.properties.timeseries;

      const timearray = timelist.map((item) => {
        const date = new Date(item.time);
        const timeValueWithsecs = date.toLocaleTimeString();
        const convert12To24Hrs = timeValueWithsecs.includes("PM")
          ? convertTime(timeValueWithsecs)
          : removeExtra00(timeValueWithsecs);
        return convert12To24Hrs;
      });
      setgraphtime(timearray);

      const weathercycle = json.properties.timeseries;
      const allDataObjArray = weathercycle.map((item) => {
        const weatherdata = item.data.instant.details;
        return weatherdata;
      });

      const graphTimeData = [];
      graphTimeData.push(graphtime);

      const fullDataWithTime = allDataObjArray.map((otherdetails, index) => {
        graphTimeData.map((timevalue, timeindex) => {
          if (index === timeindex) {
            otherdetails.time = timevalue;
          }
          return otherdetails;
        });

        return otherdetails;
      });

      const FinalData = fullDataWithTime.slice(0, 10);

      setgraphdata(FinalData);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    fetchTimeData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box component="div" className="timemap">
        <Space />
      </Box>
      <Box component="div">
        <ComposedChart
          width={840}
          height={400}
          data={graphdata}
          margin={{
            top: 20,
            right: 10,
            bottom: 0,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="time"
            label={{
              value: "Time",
              position: "insideBottomRight",
              offset: 0,
            }}
          />
          <YAxis
            label={{ value: "time", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="cloud_area_fraction"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="cloud_area_fraction_low" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="relative_humidity" stroke="#ff7300" />
        </ComposedChart>
      </Box>
    </Container>
  );
}

export default Time;
