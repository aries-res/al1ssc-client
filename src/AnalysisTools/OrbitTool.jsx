import React, { useState, useEffect } from "react";
import { useQuery, useQueries } from "react-query";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-dist-min";
import {
  Select,
  DatePicker,
  Progress,
  Radio,
  Switch,
  InputNumber,
  Slider,
  Collapse,
} from "antd";
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

const sceneAxisColors = {
  white: {
    backgroundcolor: "rgb(255,250,250)",
    gridcolor: "rgb(204, 204, 204)",
    zerolinecolor: "rgb(68, 68, 68)",
    spikecolor: "rgb(68,68,68)",
  },
  black: {
    backgroundcolor: "rgb(23,23,23)",
    gridcolor: "rgb(182, 182, 182)",
    zerolinecolor: "rgb(255, 255, 255)",
    spikecolor: "rgb(230, 230, 230)",
  },
};

const sceneAxisLayout = {
  range: [-1.15, 1.15],
  showgrid: true,
  zeroline: true,
  showbackground: true,
  ...sceneAxisColors.white,
};

export default function OrbitTool() {
  const bodiesQuery = useQuery(
    "orbit-tool-bodies",
    getData({ apiRoute: "/orbit-tool/bodies", isAnalysisTool: true }),
    { refetchOnWindowFocus: false }
  );

  if (bodiesQuery.isLoading) return <Loading />; // TODO: show a UI skeleton instead?
  if (bodiesQuery.error) return <Error err={bodiesQuery.error} />;

  return <OrbitToolUI allBodies={bodiesQuery.data} />;
}

function OrbitToolUI({ allBodies }) {
  const defaultSelectedBodies = allBodies
    .filter((body) => body.plot_by_default)
    .map((body) => body.name);
  const [selectedBodies, setSelectedBodies] = useState(defaultSelectedBodies);
  const [deselectedBody, setDeselectedBody] = useState();

  const [selectedTime, setSelectedTime] = useState(
    moment().startOf("minute").valueOf() // current time with 0 s & 0 ms in UNIX timestamp
  ); // TODO: make it round off to nearest quarter hour

  const [selectedView, setSelectedView] = useState("2d");

  console.log("render");
  return (
    <div>
      <span>Bodies: </span>
      <Select
        mode="multiple"
        placeholder="Please select bodies to plot"
        defaultValue={defaultSelectedBodies}
        style={{ width: 500 }}
        onChange={(value) => {
          setSelectedBodies(value);
          console.log(value);
        }}
        onDeselect={(value) => {
          setDeselectedBody(value);
          console.log(value);
        }}
      >
        {allBodies.map((body) => (
          <Select.Option value={body.name}>{body.name}</Select.Option>
        ))}
      </Select>
      <br />

      <span>Time [in UTC]: </span>
      <DatePicker
        defaultValue={moment(selectedTime)}
        allowClear={false}
        showTime={{
          format: "HH:mm",
          minuteStep: 15,
          defaultValue: moment("00:00:00", "HH:mm:ss"),
        }}
        onOk={(datetime) => {
          setSelectedTime(datetime.valueOf());
          console.log(datetime);
        }}
      />
      <br />

      <span>Orbit Plot View: </span>
      <Radio.Group
        onChange={(e) => {
          console.log(e.target.value);
          setSelectedView(e.target.value);
        }}
        defaultValue="3d"
      >
        <Radio.Button value="2d">2D Plot</Radio.Button>
        <Radio.Button value="3d">3D Plot</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <Plot2DView
        selectedBodies={selectedBodies}
        style={{ display: selectedView === "2d" ? "block" : "none" }}
      />
      <Plot3DView
        selectedBodies={selectedBodies}
        deselectedBody={deselectedBody}
        selectedTime={selectedTime}
        style={{ display: selectedView === "3d" ? "block" : "none" }}
      />
    </div>
  );
}

function Plot3DView({ selectedBodies, deselectedBody, selectedTime, style }) {
  const [selectedTrackLength, setSelectedTrackLength] = useState(5);
  const [selectedTimeStep, setSelectedTimeStep] = useState("12h");

  const [selectedBgColor, setSelectedBgColor] = useState("white");
  const [showGrid, setShowGrid] = useState(true);

  return (
    <div style={style}>
      <div>
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
          {/* TODO: Should be dependent on length of track or error validation */}
          {timeSteps.map((timeStep) => (
            <Select.Option value={timeStep}>{timeStep}</Select.Option>
          ))}
        </Select>
        <br />

        <span>Background color: </span>
        <Radio.Group
          defaultValue={selectedBgColor}
          onChange={(e) => setSelectedBgColor(e.target.value)}
        >
          <Radio value="white">White</Radio>
          <Radio value="black">Black</Radio>
        </Radio.Group>
        <br />

        <span>Show grid: </span>
        <Switch defaultChecked onChange={(checked) => setShowGrid(checked)} />
      </div>

      <hr />
      <Plot3DOutput
        bodies={selectedBodies}
        bodyToRemove={deselectedBody}
        timeEnd={selectedTime}
        trackLength={selectedTrackLength}
        timeStep={selectedTimeStep}
        bgColor={selectedBgColor}
        showGrid={showGrid}
      />
    </div>
  );
}

function Plot3DOutput({
  bodies,
  bodyToRemove,
  timeEnd,
  trackLength,
  timeStep,
  bgColor,
  showGrid,
}) {
  const [numBodiesPlotted, setNumBodiesPlotted] = useState(0);
  const [plotLayout, setPlotLayout] = useState({
    width: 800,
    height: 600,
    title: "3D Orbit Plot",
    scene: {
      xaxis: { ...sceneAxisLayout, title: "x (AU)" },
      yaxis: { ...sceneAxisLayout, title: "y (AU)" },
      zaxis: { ...sceneAxisLayout, title: "z (AU)" },
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

  function addBodyTrace({ x, y, z, hovertemplate, customdata, name, color }) {
    const newLineTrace = {
      x,
      y,
      z,
      hovertemplate,
      customdata,
      name,
      type: "scatter3d",
      mode: "lines",
      line: { color },
    };
    const trackEndIndex = x.length - 1;
    const newMarkerTrace = {
      x: [x[trackEndIndex]],
      y: [y[trackEndIndex]],
      z: [z[trackEndIndex]],
      hovertemplate,
      customdata: [customdata[trackEndIndex]],
      name,
      type: "scatter3d",
      mode: "markers",
      marker: { size: 3, color },
      showlegend: false,
    };

    setPlotData((prevPlotData) => {
      const lineTraceIndex = prevPlotData.findIndex(
        (trace) => trace.name === newLineTrace.name
      );
      if (lineTraceIndex >= 0) {
        // if existing, replace the traces
        const newPlotData = [...prevPlotData];
        newPlotData[lineTraceIndex] = newLineTrace;
        newPlotData[lineTraceIndex + 1] = newMarkerTrace;
        return newPlotData;
      } else return prevPlotData.concat(newLineTrace, newMarkerTrace);
    });

    setNumBodiesPlotted((prevNumBodiesPlotted) => {
      console.log(prevNumBodiesPlotted + 1);
      return prevNumBodiesPlotted + 1;
    });
  }

  useEffect(() => {
    function removeBodyTrace(body) {
      setPlotData((prevPlotData) => {
        const newPlotData = prevPlotData.filter((trace) => trace.name !== body); // remove line & marker trace with body to be removed as their name
        console.log(newPlotData);
        return newPlotData;
      });

      setNumBodiesPlotted((prevNumBodiesPlotted) => {
        console.log(prevNumBodiesPlotted - 1);
        return prevNumBodiesPlotted - 1;
      });
    }

    // When bodyToRemove prop changes (except when component renders 1st time
    // i.e. bodyToRemove=undefined), remove it from plot.
    if (bodyToRemove) removeBodyTrace(bodyToRemove);
  }, [bodyToRemove]);

  useEffect(() => {
    // When time period related props change, all bodies data will be fetched again
    // so reset num of bodies plotted to 0
    setNumBodiesPlotted(0);
  }, [timeEnd, trackLength, timeStep]);

  useQueries(
    bodies.map((body) => {
      const timeStart = moment(timeEnd)
        .subtract(...trackLengths[trackLength].duration)
        .format("YYYY-MM-DDTHH:mm:ss");
      const timeStop = moment(timeEnd).format("YYYY-MM-DDTHH:mm:ss");
      return {
        queryKey: ["orbitData", body, timeStart, timeStop, timeStep],
        queryFn: getData({
          apiRoute: "/orbit-tool/3D",
          getParams: {
            timeStart: timeStart,
            timeStop: timeStop,
            timeStep: timeStep,
            body: body,
          },
          isAnalysisTool: true,
        }),
        onSuccess: (bodyOrbitData) => addBodyTrace(bodyOrbitData),
        // TODO: onError: Handle when query fails
        refetchOnWindowFocus: false,
      };
    })
  );

  useEffect(() => {
    // When bgColor prop changes, update layout to change colors of axes accordingly
    setPlotLayout((prevPlotLayout) => ({
      ...prevPlotLayout,
      scene: {
        xaxis: { ...prevPlotLayout.scene.xaxis, ...sceneAxisColors[bgColor] },
        yaxis: { ...prevPlotLayout.scene.yaxis, ...sceneAxisColors[bgColor] },
        zaxis: { ...prevPlotLayout.scene.zaxis, ...sceneAxisColors[bgColor] },
      },
    }));
  }, [bgColor]);

  useEffect(() => {
    // When showGrid prop changes, update layout to show/hide grid & zero lines
    setPlotLayout((prevPlotLayout) => ({
      ...prevPlotLayout,
      scene: {
        xaxis: {
          ...prevPlotLayout.scene.xaxis,
          showgrid: showGrid,
          zeroline: showGrid,
        },
        yaxis: {
          ...prevPlotLayout.scene.yaxis,
          showgrid: showGrid,
          zeroline: showGrid,
        },
        zaxis: {
          ...prevPlotLayout.scene.zaxis,
          showgrid: showGrid,
          zeroline: showGrid,
        },
      },
    }));
  }, [showGrid]);

  return (
    <div>
      <Plot3DStatus
        numBodiesPlotted={numBodiesPlotted}
        totalNumBodies={bodies.length}
      />
      <Plot divId="orbitPlot3D" data={plotData} layout={plotLayout} />
    </div>
  );
}

function Plot3DStatus({ numBodiesPlotted, totalNumBodies }) {
  if (totalNumBodies === 0) {
    return <p>No bodies selected to plot. Please select atleast one!</p>;
  } else {
    return (
      <div>
        <Progress
          percent={(numBodiesPlotted * 100) / totalNumBodies}
          steps={totalNumBodies}
          // size="small"
          showInfo={false}
        />
        <span style={{ marginLeft: "10px" }}>
          {numBodiesPlotted === totalNumBodies
            ? "All the specified orbits have been plotted ✅"
            : "Updating the plot with specified orbits ⏳"}
        </span>
      </div>
    );
  }
}

function Plot2DView({ style, selectedBodies }) {
  return (
    <div style={style}>
      <span>
        Solar wind speed (v<sub>sw</sub>) [in km/s]:
      </span>
      {selectedBodies.map((body) => (
        <div key={body}>
          <span>{`${body}: `}</span>
          <InputNumber type="number" defaultValue={400} min={1} />
        </div>
      ))}
      <br />

      <span>Show Parker spirals: </span>
      <Switch defaultChecked onChange={(f) => f} />
      <br />

      <span>Show straight line from Sun to Body: </span>
      <Switch defaultChecked onChange={(f) => f} />
      <br />

      <span>Show Earth-aligned coordinate system: </span>
      <Switch onChange={(f) => f} />
      <br />

      <span>Show a reference (e.g. flare): </span>
      <Switch defaultChecked onChange={(f) => f} />
      <br />

      <RefCoordInput />

      <hr />
      <Plot2DOutput />
    </div>
  );
}

function RefCoordInput() {
  return (
    <Collapse bordered={false}>
      <Collapse.Panel header="Specify reference coordinates">
        <span>Carrington Longitude: </span>
        <Slider
          min={0}
          max={360}
          marks={{ 0: "0°", 90: "90°", 180: "180°", 270: "270°", 360: "360°" }}
          defaultValue={20}
        />
        <br />
        <span>Carrington Latitude: </span>
        <Slider
          min={-90}
          max={90}
          marks={{ "-90": "-90°", 0: "0°", 90: "90°" }}
          defaultValue={0}
        />
        <span>Solar Wind Speed: </span>
        <br />
        <InputNumber type="number" defaultValue={400} min={1} />
      </Collapse.Panel>
    </Collapse>
  );
}

function Plot2DOutput() {
  const orbit2DQuery = useQuery(
    "orbitTool2D",
    getData({
      apiRoute: "/orbit-tool/2D",
      getParams: {
        time: "2020-05-12T13:30:00",
        bodies: ["PSP", "Earth", "Solar Orbiter", "Venus"],
        vsw: [400, 400, 900, 400],
        spirals: true,
        sbLine: true,
        coordE: false,
        refLong: 90,
        refLat: 20,
        refVsw: 400,
      },
      isAnalysisTool: true,
    }),
    { refetchOnWindowFocus: false }
  );

  if (orbit2DQuery.isLoading) return <Loading />;

  return <img src={orbit2DQuery.data.plot} alt="plot" width="800px" />;
}
