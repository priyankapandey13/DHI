import React, { useState, useEffect } from "react";
import "./Home.css";
import { Box, Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
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
import TextField from "@material-ui/core/TextField";

const apiURL =
  "https://api.met.no/weatherapi/locationforecast/2.0/complete?altitude=0&lat=55.6761&lon=12.5683";

const realdata = [];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

function Time() {
  const [Graphdata, setGraphdata] = useState({});

  async function fetchData() {
    const response = await fetch(apiURL);
    response
      .json()
      .then((response) => {
        const weathercycle = response.properties.timeseries;
        weathercycle.map((item) => {
          const weatherdata = item.data.instant.details;
          realdata.push(weatherdata);
          return weatherdata;
        });
        setGraphdata(realdata);
      })
      .catch((err) => alert(err));
  }
  useEffect(() => {
    fetchData();
  });

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      {/* <h2>Time</h2>
      <p>
        In this graph data is fetched acording to the location input by user.
      </p> */}
      <Box component="div">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="City name"
            variant="outlined"
            size="small"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => fetchData()}
          >
            Submit
          </Button>
        </form>
      </Box>
      <Box component="div">
        <ComposedChart
          width={840}
          height={400}
          data={Graphdata}
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
            dataKey="air_temperature"
            label={{
              value: "Air Temperature",
              position: "insideBottomRight",
              offset: 0,
            }}
          />
          <YAxis
            label={{ value: "Index", angle: -90, position: "insideLeft" }}
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
