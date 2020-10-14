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
import { makeStyles } from "@material-ui/core/styles";

import Space from "./space";

const apiURL =
  "https://api.met.no/weatherapi/locationforecast/2.0/complete?altitude=0&lat=55.6761&lon=12.5683";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

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
  const [graphdata, setgraphdata] = useState({});
  const [graphtime, setgraphtime] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
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

      // Because graphtime itself is an object which has array inside it. That's why push
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

  const classes = useStyles();

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
          className={classes.root}
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
