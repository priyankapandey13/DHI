import React, { useState, useEffect, useCallback, useContext } from "react";
import "./Home.css";
import { Box, Container } from "@material-ui/core";
import { GlobalStateContextLati, GlobalStateContextLongi } from "./Home";

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

const SelectedCordinates = [{ latitude: 0, longitude: 0 }];

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
  const [CurrentGraphInputLati] = useContext(GlobalStateContextLati);
  const [CurrentGraphInputLongi] = useContext(GlobalStateContextLongi);
  const [graphdata, setgraphdata] = useState([]);

  const apiURL = `https://api.met.no/weatherapi/locationforecast/2.0/complete?altitude=0&lat=${CurrentGraphInputLati}&lon=${CurrentGraphInputLongi}`;

  const fetchTimeDataCallback = useCallback(() => {
    async function fetchTimeData() {
      try {
        const response = await fetch(apiURL);
        const json = await response.json();

        const weathercycle = json.properties.timeseries;
        const allDataObjArray = weathercycle.map((item) => {
          const weatherdata = item.data.instant.details;
          return weatherdata;
        });

        const timelist = json.properties.timeseries;

        const timearray = timelist.map((item) => {
          const date = new Date(item.time);
          const timeValueWithsecs = date.toLocaleTimeString();
          const convert12To24Hrs = timeValueWithsecs.includes("PM")
            ? convertTime(timeValueWithsecs)
            : removeExtra00(timeValueWithsecs);
          return convert12To24Hrs;
        });

        const graphTimeData = [];
        graphTimeData.push(timearray);

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

        SelectedCordinates.forEach((readings) => {
          readings.latitude = CurrentGraphInputLati;
          readings.longitude = CurrentGraphInputLongi;
        });
      } catch (err) {
        alert(err);
      }
    }

    fetchTimeData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchTimeDataCallback();
  }, [fetchTimeDataCallback]);

  return (
    <Container maxWidth="lg">
      <Box component="div" className="timemap"></Box>
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
            label={{ value: "Value (%)", angle: -90, position: "insideLeft" }}
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

        <div className="timecordinates">
          This chart is for these coordinates, latitude is : {CurrentGraphInputLati}, and the longitude is :{" "}
          {CurrentGraphInputLongi}
        </div>
      </Box>
    </Container>
  );
}

export default Time;
