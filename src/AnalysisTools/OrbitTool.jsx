import React, { useState, useEffect } from "react";
import { useQuery, useQueries } from "react-query";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-dist-min";
import { Select, DatePicker } from "antd";
import moment from "moment";
import momentTimezone from "moment-timezone";

import { getData } from "../apiUtils";
import Loading from "../components/Loading";
import Error from "../components/Error";

momentTimezone.tz.setDefault("Etc/UTC");
const Plot = createPlotlyComponent(Plotly);

// TODO: Add expanded form in duration
const trackLengths = [
  { value: "24h", duration: [24, "h"] },
  { value: "7d", duration: [7, "d"] },
  { value: "15d", duration: [15, "d"] },
  { value: "30d", duration: [30, "d"] },
  { value: "60d", duration: [60, "d"] },
  { value: "90d", duration: [90, "d"] },
  { value: "4M", duration: [4, "M"] },
  { value: "6M", duration: [6, "M"] },
  { value: "1y", duration: [1, "y"] },
];
const timeSteps = ["12h", "24h", "48h", "7d", "10d", "15d", "30d", "60d"];

export default function OrbitTool() {
  const [allBodies, setAllBodies] = useState([]);
  const [selectedBodies, setSelectedBodies] = useState([
    "PSP",
    "SOLO",
    "Earth",
  ]);
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    moment().startOf("minute").valueOf() // current time with 0 s & 0 ms in UNIX timestamp
  );
  const [selectedTrackLength, setSelectedTrackLength] = useState(5);
  const [selectedTimeStep, setSelectedTimeStep] = useState("12h");

  const bodiesQuery = useQuery(
    "orbit-tool-bodies",
    getData({ apiRoute: "/orbit-tool/bodies", isAnalysisTool: true }),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setAllBodies(data);
      },
    }
  );

  if (bodiesQuery.isLoading) return <Loading />;
  if (bodiesQuery.error) return <Error response={bodiesQuery.error.response} />;

  return (
    <>
      <div>
        <span>Bodies: </span>
        <Select
          mode="multiple"
          placeholder="Please select bodies to plot"
          defaultValue={selectedBodies}
          style={{ width: 300 }}
          onChange={(value) => {
            setSelectedBodies(value);
            console.log(value);
          }}
        >
          {allBodies.map((body) => (
            <Select.Option value={body.name}>{body.name}</Select.Option>
          ))}
        </Select>
        <br />

        <span>End Time (in UTC): </span>
        <DatePicker
          defaultValue={moment(selectedTimeEnd)}
          allowClear={false}
          showTime={{
            format: "HH:mm",
            minuteStep: 15,
            defaultValue: moment("00:00:00", "HH:mm:ss"),
          }}
          onOk={(date) => {
            setSelectedTimeEnd(date.valueOf());
            console.log(date);
          }}
        />
        <br />

        <span>Length of track: </span>
        <Select
          defaultValue={selectedTrackLength}
          style={{ width: 100 }}
          onChange={(value) => {
            setSelectedTrackLength(value);
            console.log(trackLengths[value]);
          }}
        >
          {trackLengths.map((trackLength, i) => (
            <Select.Option value={i}>{trackLength.value}</Select.Option>
          ))}
        </Select>
        <br />

        <span>Time step: </span>
        <Select
          defaultValue={selectedTimeStep}
          style={{ width: 100 }}
          onChange={(value) => {
            setSelectedTimeStep(value);
            console.log(value);
          }}
        >
          {timeSteps.map((timeStep) => (
            <Select.Option value={timeStep}>{timeStep}</Select.Option>
          ))}
        </Select>
      </div>
      <OrbitPlot3D
        bodies={selectedBodies}
        timeEnd={selectedTimeEnd}
        trackLength={selectedTrackLength}
        timeStep={selectedTimeStep}
      />
    </>
  );
}

function OrbitPlot3D({ bodies, timeEnd, trackLength, timeStep }) {
  const [plotLayout, setPlotLayout] = useState({
    width: 800,
    height: 600,
    title: "3D Orbit Tool",
    xaxis: { exponentformat: "e" },
    yaxis: { exponentformat: "e" },
    zaxis: { exponentformat: "e" },
    scene: {
      xaxis: { range: [-1.15, 1.15] },
      yaxis: { range: [-1.15, 1.15] },
      zaxis: { range: [-1.15, 1.15] },
    },
  });

  const [plotData, setPlotData] = useState([
    {
      x: [0],
      y: [0],
      z: [0],
      type: "scatter3d",
      mode: "markers",
      marker: { color: "orange", size: 5 },
      name: "Sun",
    },
  ]);

  // add body's trace at index it is already present otherwise at end
  function addBodyTrace(data) {
    const newTrace = { ...data, type: "scatter3d", mode: "lines" };
    // TODO: Add scatter trace for data[-1] with no legend, hover
    setPlotData((prevPlotData) => {
      // TODO: Maintain a hashmap of bodies-name and traceindex in plotData (-1 if not present)
      const traceIndex = prevPlotData.findIndex(
        (trace) => trace.name === newTrace.name
      );
      if (traceIndex >= 0) {
        // if existing, replace the trace
        const newPlotData = [...prevPlotData];
        newPlotData[traceIndex] = newTrace;
        return newPlotData;
      } else return prevPlotData.concat(newTrace);
    });
  }

  useEffect(() => {
    setPlotData((prevPlotData) => {
      const newPlotData = prevPlotData.filter(
        (trace) =>
          trace.name === "Sun" ||
          bodies.findIndex((body) => body === trace.name) >= 0 // trace is for same body
      );
      console.log(newPlotData);
      return newPlotData;
    });
  }, [bodies]);

  useQueries(
    bodies.map((body) => {
      const timeStart = moment(timeEnd)
        .subtract(...trackLengths[trackLength].duration)
        .format("YYYY-MM-DDTHH:mm:ss");
      const timeStop = moment(timeEnd).format("YYYY-MM-DDTHH:mm:ss");
      return {
        queryKey: ["orbitData", body, timeStart, timeStop, timeStep],
        queryFn: getData({
          apiRoute: "/orbit-tool/",
          getParams: {
            timeStart: timeStart,
            timeStop: timeStop,
            timeStep: timeStep,
            body: body,
          },
          isAnalysisTool: true,
        }),
        onSuccess: (bodyOrbitData) => addBodyTrace(bodyOrbitData),
        refetchOnWindowFocus: false,
      };
    })
  );

  return <Plot divId="orbitPlot3D" data={plotData} layout={plotLayout} />;
}
