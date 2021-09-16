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
  Table,
  Row,
  Col,
  Divider,
  Card,
  Typography,
  Image,
  Button,
} from "antd";
import {
  BarChartOutlined,
  HourglassTwoTone,
  CheckCircleTwoTone,
  ArrowsAltOutlined,
} from "@ant-design/icons";
import moment from "moment";
import momentTimezone from "moment-timezone";

import { getData } from "../apiUtils";
import Loading from "../components/Loading";
import Error from "../components/Error";
import "./OrbitTool.less";

momentTimezone.tz.setDefault("Etc/UTC");
const Plot = createPlotlyComponent(Plotly);

const trackLengths = [
  { label: "24 hours", duration: [24, "h"] },
  { label: "7 days", duration: [7, "d"] },
  { label: "15 days", duration: [15, "d"] },
  { label: "30 days", duration: [30, "d"] },
  { label: "60 days", duration: [60, "d"] },
  { label: "90 days", duration: [90, "d"] },
  { label: "4 months", duration: [4, "M"] },
  { label: "6 months", duration: [6, "M"] },
  { label: "1 year", duration: [1, "y"] },
];

const timeSteps = [
  { label: "12 hours", value: "12h" },
  { label: "24 hours", value: "24h" },
  { label: "2 days", value: "2d" },
  { label: "3 days", value: "3d" },
];

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

const trackThicknesses = [
  { label: "Very Thin", lineWidth: 1, markerSize: 2 },
  { label: "Thin", lineWidth: 2, markerSize: 3 },
  { label: "Medium", lineWidth: 3, markerSize: 4 },
  { label: "Thick", lineWidth: 4, markerSize: 5 },
  { label: "Very Thick", lineWidth: 5, markerSize: 6 },
];

const legendAtTopCenter = {
  orientation: "h",
  xanchor: "center",
  x: 0.5,
  yanchor: "top",
  y: 0.95,
};

export default function OrbitTool({ isMobile }) {
  const bodiesQuery = useQuery(
    "orbit-tool-bodies",
    getData({ apiRoute: "/orbit-tool/bodies", isAnalysisTool: true }),
    { refetchOnWindowFocus: false }
  );

  if (bodiesQuery.isLoading) return <Loading />; // TODO: show a UI skeleton instead?
  if (bodiesQuery.error) return <Error err={bodiesQuery.error} />;

  return <OrbitToolUI allBodies={bodiesQuery.data} isMobile={isMobile} />;
}

function OrbitToolUI({ allBodies, isMobile }) {
  const defaultSelectedBodies = allBodies
    .filter((body) => body.plot_by_default)
    .map((body) => body.name);
  const [selectedBodies, setSelectedBodies] = useState(defaultSelectedBodies);
  const [deselectedBody, setDeselectedBody] = useState();

  const [selectedTime, setSelectedTime] = useState(
    moment().startOf("day").valueOf() // current date with 00:00:00 time in UNIX timestamp
  );

  const [selectedView, setSelectedView] = useState("2d");

  console.log("render");
  return (
    <Card className="ot">
      <Row className="ot-form-item">
        <Col xs={24} sm={8} className="ot-form-item-label">
          Bodies :
        </Col>
        <Col xs={24} sm={16}>
          <Select
            mode="multiple"
            placeholder="Please select bodies to plot"
            defaultValue={defaultSelectedBodies}
            className="ot-form-item-multiselect"
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
              <Select.Option value={body.name} key={body.name}>
                {body.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row className="ot-form-item">
        <Col xs={24} sm={8} className="ot-form-item-label">
          Time [in UTC] :
        </Col>
        <Col xs={24} sm={16}>
          <DatePicker
            defaultValue={moment(selectedTime)}
            allowClear={false}
            showTime={{
              format: "HH:mm",
              minuteStep: 15,
              defaultValue: moment("00:00:00", "HH:mm:ss"),
            }}
            showNow={false}
            onOk={(datetime) => {
              setSelectedTime(datetime.valueOf());
              console.log(datetime);
            }}
            // TODO: also change state when manually entered (input date & enter key pressed)
          />
        </Col>
      </Row>
      <Row className="ot-form-item">
        <Col xs={24} sm={8} className="ot-form-item-label">
          Orbit Plot View :
        </Col>
        <Col xs={24} sm={16}>
          <Radio.Group
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedView(e.target.value);
            }}
            defaultValue="2d"
          >
            <Radio.Button value="2d">2D Plot</Radio.Button>
            <Radio.Button value="3d">3D Plot</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Divider />
      <Plot2DView
        selectedBodies={selectedBodies}
        selectedTime={selectedTime}
        style={{ display: selectedView === "2d" ? "block" : "none" }}
      />
      <Plot3DView
        selectedBodies={selectedBodies}
        deselectedBody={deselectedBody}
        selectedTime={selectedTime}
        isMobile={isMobile}
        style={{ display: selectedView === "3d" ? "block" : "none" }}
      />
    </Card>
  );
}

function Plot3DView({
  selectedBodies,
  deselectedBody,
  selectedTime,
  isMobile,
  style,
}) {
  const [selectedTrackLength, setSelectedTrackLength] = useState(5);
  const [selectedTimeStep, setSelectedTimeStep] = useState(0);

  const [selectedBgColor, setSelectedBgColor] = useState("white");
  const [showGrid, setShowGrid] = useState(true);
  const [selectedTrackThickness, setSelectedTrackThickness] = useState(1);

  return (
    <div style={style}>
      <Row className="ot-form-item">
        <Col xs={24} sm={8} className="ot-form-item-label">
          Length of track :
        </Col>
        <Col xs={24} sm={16}>
          <Select
            defaultValue={selectedTrackLength}
            className="ot-form-item-select"
            onChange={(value) => {
              setSelectedTrackLength(value);
              console.log(trackLengths[value]);
            }}
          >
            {trackLengths.map((trackLength, i) => (
              <Select.Option value={i} key={i}>
                {trackLength.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Row className="ot-form-item">
        <Col xs={24} sm={8} className="ot-form-item-label">
          Time step :
        </Col>
        <Col xs={24} sm={16}>
          <Select
            defaultValue={selectedTimeStep}
            className="ot-form-item-select"
            onChange={(value) => {
              setSelectedTimeStep(value);
              console.log(value);
            }}
          >
            {/* TODO: Should be dependent on length of track or error validation */}
            {timeSteps.map((timeStep, i) => (
              <Select.Option value={i} key={i}>
                {timeStep.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Row className="ot-form-item">
        <Col xs={24} sm={8} className="ot-form-item-label">
          Background color :
        </Col>
        <Col xs={24} sm={16}>
          <Radio.Group
            defaultValue={selectedBgColor}
            onChange={(e) => setSelectedBgColor(e.target.value)}
          >
            <Radio value="white">White</Radio>
            <Radio value="black">Black</Radio>
          </Radio.Group>
        </Col>
      </Row>

      <Row className="ot-form-item">
        <Col xs={24} sm={8} className="ot-form-item-label">
          Show grid :
        </Col>
        <Col xs={24} sm={16}>
          <Switch defaultChecked onChange={(checked) => setShowGrid(checked)} />
        </Col>
      </Row>

      <Row className="ot-form-item">
        <Col xs={24} sm={8} className="ot-form-item-label">
          Thickness of orbit tracks :
        </Col>
        <Col xs={24} sm={16}>
          <Select
            defaultValue={selectedTrackThickness}
            className="ot-form-item-select"
            onChange={(value) => setSelectedTrackThickness(value)}
          >
            {trackThicknesses.map((thickness, i) => (
              <Select.Option key={i} value={i}>
                {thickness.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Divider className="ot-output-divider">
        <BarChartOutlined /> 3D Orbit Plot
      </Divider>

      <Plot3DOutput
        bodies={selectedBodies}
        bodyToRemove={deselectedBody}
        timeEnd={selectedTime}
        trackLength={selectedTrackLength}
        timeStep={selectedTimeStep}
        bgColor={selectedBgColor}
        showGrid={showGrid}
        trackThickness={selectedTrackThickness}
        isMobile={isMobile}
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
  trackThickness,
  isMobile,
}) {
  const [numBodiesPlotted, setNumBodiesPlotted] = useState(0);
  const [plotLayout, setPlotLayout] = useState({
    autosize: true,
    title: {
      text: `Orbit tracks for a time span of ${trackLength}<br>until ${moment(
        timeEnd
      ).format("YYYY-MM-DD HH:mm:ss")} UTC`,
      size: 15,
    },
    scene: {
      xaxis: { ...sceneAxisLayout, title: "x (AU)" },
      yaxis: { ...sceneAxisLayout, title: "y (AU)" },
      zaxis: { ...sceneAxisLayout, title: "z (AU)" },
    },
    margin: {
      l: 5,
      r: 5,
      b: 20,
      t: 80,
    },
    ...(isMobile && { legend: legendAtTopCenter }),
  });

  const [plotData, setPlotData] = useState([
    {
      x: [0],
      y: [0],
      z: [0],
      type: "scatter3d",
      mode: "markers",
      marker: {
        color: "orange",
        size: trackThicknesses[trackThickness].markerSize + 2,
      },
      name: "Sun",
    },
  ]);

  const [tableData, setTableData] = useState([]);

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
      line: { color, width: trackThicknesses[trackThickness].lineWidth },
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
      marker: { color, size: trackThicknesses[trackThickness].markerSize },
      showlegend: false,
    };

    const [, lon, lat, dist] = customdata[trackEndIndex];
    const newRow = {
      Body: name,
      "Longitude (°)": lon,
      "Latitude (°)": lat,
      "Heliocentric Distance (AU)": dist,
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

    setTableData((prevTableData) => {
      const rowIndex = prevTableData.findIndex((row) => row.Body === name);

      if (rowIndex >= 0) {
        // already exists
        const newTableData = [...prevTableData];
        newTableData[rowIndex] = newRow;
        return newTableData;
      } else return prevTableData.concat(newRow);
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

      setTableData((prevTableData) => {
        const newTableData = prevTableData.filter((row) => row.Body !== body);
        console.log(newTableData);
        return newTableData;
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
      const params = {
        body,
        timeStart: moment(timeEnd)
          .subtract(...trackLengths[trackLength].duration)
          .format("YYYY-MM-DDTHH:mm:ss"),
        timeStop: moment(timeEnd).format("YYYY-MM-DDTHH:mm:ss"),
        timeStep: timeSteps[timeStep].value,
      };
      return {
        queryKey: ["plot3D", params],
        queryFn: getData({
          apiRoute: "/orbit-tool/3D",
          getParams: params,
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

  useEffect(() => {
    // When trackThickness prop changes, update all traces with new thickness
    setPlotData((prevPlotData) =>
      prevPlotData.map((trace) => {
        if (trace.mode === "lines")
          return {
            ...trace,
            line: {
              ...trace.line,
              width: trackThicknesses[trackThickness].lineWidth,
            },
          };
        else {
          // mode === "markers"
          if (trace.name === "Sun")
            return {
              ...trace,
              marker: {
                ...trace.marker,
                size: trackThicknesses[trackThickness].markerSize + 2,
              },
            };
          else
            return {
              ...trace,
              marker: {
                ...trace.marker,
                size: trackThicknesses[trackThickness].markerSize,
              },
            };
        }
      })
    );
  }, [trackThickness]);

  useEffect(() => {
    // when isMobile prop changes, change legend's position in plot layout
    setPlotLayout((prevPlotLayout) =>
      isMobile
        ? { ...prevPlotLayout, legend: legendAtTopCenter }
        : { ...prevPlotLayout, legend: undefined }
    );
  }, [isMobile]);

  useEffect(() => {
    // Change plot's title based on timeEnd & trackLength props
    setPlotLayout((prevPlotLayout) => ({
      ...prevPlotLayout,
      title: {
        ...prevPlotLayout.title,
        text: `Orbit tracks for a time span of ${
          trackLengths[trackLength].label
        }<br>until ${moment(timeEnd).format("YYYY-MM-DD HH:mm:ss")} UTC`,
      },
    }));
  }, [timeEnd, trackLength]);

  return (
    <div>
      <Plot3DStatus
        numBodiesPlotted={numBodiesPlotted}
        totalNumBodies={bodies.length}
      />
      {/* <Divider dashed /> */}
      <Plot
        divId="orbitPlot3D"
        data={plotData}
        layout={plotLayout}
        useResizeHandler={true}
        className={`ot-3d-output-plot${
          isMobile ? " ot-3d-output-plot-mobile" : ""
        }`}
      />
      <Typography.Paragraph type="secondary" className="ot-plot-info">
        All the coordinates are in <b>Heliocentric Inertial</b> coordinate
        system.
      </Typography.Paragraph>
      <Typography.Paragraph type="secondary" className="ot-plot-info">
        Hover over the orbit tracks in the plot to see the coordinates in
        longitude, latitude & distance.
      </Typography.Paragraph>
      <OutputTable data={tableData} className="ot-output-table" />
    </div>
  );
}

function Plot3DStatus({ numBodiesPlotted, totalNumBodies }) {
  if (totalNumBodies === 0) {
    return <p>No bodies selected to plot. Please select atleast one!</p>;
  } else {
    return (
      <div className="ot-3d-status">
        <Progress
          percent={(numBodiesPlotted * 100) / totalNumBodies}
          steps={totalNumBodies}
          // size="small"
          showInfo={false}
        />
        <span className="ot-3d-status-text">
          {numBodiesPlotted === totalNumBodies ? (
            <>
              All the specified orbits have been plotted{" "}
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            </>
          ) : (
            <>
              Updating the plot with specified orbits <HourglassTwoTone />
            </>
          )}
        </span>
      </div>
    );
  }
}

function Plot2DView({ selectedBodies, selectedTime, style }) {
  const [bodiesVsw, setBodiesVsw] = useState({});
  const [showSpirals, setShowSpirals] = useState(true);
  const [showSbLine, setShowSbLine] = useState(true);
  const [showCoordE, setShowCoordE] = useState(false);

  const [showReference, setShowReference] = useState(true);
  const [refLong, setRefLong] = useState(20);
  const [refLat, setRefLat] = useState(0);
  const [refVsw, setRefVsw] = useState(400);

  function handleVswInputChange(body, inputValue) {
    // input value is other than value stored in state
    if (inputValue !== bodiesVsw[body])
      setBodiesVsw((prevBodiesVsw) => ({
        ...prevBodiesVsw,
        [body]: inputValue,
      }));
  }

  function handleRefLongChange(value) {
    setRefLong(value);
  }

  function handleRefLatChange(value) {
    setRefLat(value);
  }

  function handleRefVswChange(value) {
    if (value !== refVsw) setRefVsw(value);
  }

  useEffect(() => {
    setBodiesVsw((prevBodiesVsw) =>
      selectedBodies.reduce((map, body) => {
        // if doesn't exist previously, set to inputNumber's default value i.e. 400
        map[body] = prevBodiesVsw[body] || 400;
        return map;
      }, {})
    );
  }, [selectedBodies]);

  return (
    <div style={style}>
      <Collapse className="ot-form-item-collapse">
        <Collapse.Panel
          className="ot-form-item-collapse-panel"
          header={
            <span>
              Solar wind speed (v<sub>sw</sub>) [in km/s]
            </span>
          }
        >
          {selectedBodies.map((body) => (
            <Row key={body} className="ot-form-item">
              <Col
                xs={24}
                sm={8}
                className="ot-form-item-label"
              >{`${body} :`}</Col>
              <Col xs={24} sm={16}>
                <InputNumber
                  type="number"
                  defaultValue={400}
                  min={1}
                  data-body={body} // to identify which body's vsw input is for
                  onBlur={(e) =>
                    handleVswInputChange(
                      e.target.dataset.body,
                      e.target.valueAsNumber
                    )
                  }
                />
              </Col>
            </Row>
          ))}
        </Collapse.Panel>
      </Collapse>

      <Row className="ot-form-item">
        <Col xs={24} sm={8} className="ot-form-item-label">
          Show Parker spirals :
        </Col>
        <Col xs={24} sm={3} className="ot-form-item-control-1st">
          <Switch
            defaultChecked
            onChange={(checked) => setShowSpirals(checked)}
          />
        </Col>
        <Col xs={24} sm={8} className="ot-form-item-label">
          Show straight line from Sun to Body :
        </Col>
        <Col xs={24} sm={5}>
          <Switch
            defaultChecked
            onChange={(checked) => setShowSbLine(checked)}
          />
        </Col>
      </Row>

      <Row className="ot-form-item">
        <Col xs={24} sm={8} className="ot-form-item-label">
          Show Earth-aligned coordinate system :
        </Col>
        <Col xs={24} sm={3} className="ot-form-item-control-1st">
          <Switch onChange={(checked) => setShowCoordE(checked)} />
        </Col>
        <Col xs={24} sm={8} className="ot-form-item-label">
          Show a reference (e.g. flare) :
        </Col>
        <Col xs={24} sm={5}>
          <Switch
            defaultChecked
            onChange={(checked) => setShowReference(checked)}
          />
        </Col>
      </Row>

      <RefCoordInput
        enabled={showReference}
        onRefLongChange={handleRefLongChange}
        onRefLatChange={handleRefLatChange}
        onRefVswChange={handleRefVswChange}
      />

      <Divider className="ot-output-divider">
        <BarChartOutlined /> 2D Orbit Plot
      </Divider>

      <Plot2DOutput
        time={selectedTime}
        bodies={selectedBodies}
        bodiesVsw={bodiesVsw}
        showSpirals={showSpirals}
        showSbLine={showSbLine}
        showCoordE={showCoordE}
        reference={showReference ? { refLong, refLat, refVsw } : {}}
      />
    </div>
  );
}

function RefCoordInput({
  enabled,
  onRefLongChange,
  onRefLatChange,
  onRefVswChange,
}) {
  const [activeKey, setActiveKey] = useState([]); // keep all panels collapsed initially

  useEffect(() => {
    if (!enabled) setActiveKey([]); // collapse all panels
  }, [enabled]);

  return (
    <Collapse
      className="ot-form-item-collapse"
      activeKey={activeKey}
      onChange={(key) => setActiveKey(key)} // so that user action changes active key
    >
      <Collapse.Panel
        className="ot-form-item-collapse-panel"
        header="Coordinates of the reference"
        collapsible={enabled ? undefined : "disabled"}
        key="main"
      >
        <Row className="ot-form-item">
          <Col xs={24} sm={8} className="ot-form-item-label">
            Longitude :
          </Col>
          <Col xs={24} sm={16}>
            <Slider
              min={0}
              max={360}
              marks={{
                0: "0°",
                90: "90°",
                180: "180°",
                270: "270°",
                360: "360°",
              }}
              defaultValue={20}
              onAfterChange={(value) => onRefLongChange(value)}
            />
          </Col>
        </Row>

        <Row className="ot-form-item">
          <Col xs={24} sm={8} className="ot-form-item-label">
            Latitude :
          </Col>
          <Col xs={24} sm={16}>
            <Slider
              min={-90}
              max={90}
              marks={{ "-90": "-90°", 0: "0°", 90: "90°" }}
              defaultValue={0}
              onAfterChange={(value) => onRefLatChange(value)}
            />
          </Col>
        </Row>

        <Row className="ot-form-item">
          <Col xs={24} sm={8} className="ot-form-item-label">
            Solar Wind Speed :
          </Col>
          <Col xs={24} sm={16}>
            <InputNumber
              type="number"
              defaultValue={400}
              min={1}
              onBlur={(e) => onRefVswChange(e.target.valueAsNumber)}
            />
          </Col>
        </Row>
      </Collapse.Panel>
    </Collapse>
  );
}

function Plot2DOutput({
  time,
  bodies,
  bodiesVsw,
  showSpirals,
  showSbLine,
  showCoordE,
  reference,
}) {
  const timestamp = moment(time).format("YYYY-MM-DDTHH:mm:ss");
  const vsw = bodies.map((body) => bodiesVsw[body]);
  const params = {
    time: timestamp,
    bodies,
    vsw,
    spirals: showSpirals,
    sbLine: showSbLine,
    coordE: showCoordE,
    ...reference,
  };
  const orbit2DQuery = useQuery(
    ["plot2D", params],
    getData({
      apiRoute: "/orbit-tool/2D",
      getParams: params,
      isAnalysisTool: true,
    }),
    { refetchOnWindowFocus: false }
  );

  if (orbit2DQuery.isLoading) return <Loading />;
  if (orbit2DQuery.isError) return <Error err={orbit2DQuery.error} />;
  return (
    <div>
      <OutputPlotImage src={orbit2DQuery.data.plot} />

      <Typography.Paragraph
        type="secondary"
        className="ot-plot-info ot-plot-info-2d"
      >
        All the coordinates are in <b>Heliographic Carrington</b> coordinate
        system.
      </Typography.Paragraph>
      <Typography.Paragraph
        type="secondary"
        className="ot-plot-info ot-plot-info-2d"
      >
        This plot is adapted from open-sourced{" "}
        <a
          href="https://github.com/esdc-esac-esa-int/Solar-MACH"
          target="_blank"
          rel="noopener noreferrer"
        >
          Solar-MACH
        </a>{" "}
        by ESA.
      </Typography.Paragraph>

      <OutputTable
        data={orbit2DQuery.data.table}
        className="ot-output-table ot-output-table-2d"
      />
    </div>
  );
}

function OutputPlotImage({ src }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="ot-2d-output-plot">
        <Button
          title="Enlarge Image"
          icon={<ArrowsAltOutlined />}
          className="ot-2d-output-plot-enlarge-btn"
          onClick={() => setVisible(true)}
        />
        <img src={src} alt="2D Orbit Plot" className="ot-2d-output-plot-img" />
      </div>

      {/* For Image Preview */}
      <div style={{ display: "none" }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
        >
          <Image src={src} />
        </Image.PreviewGroup>
      </div>
    </div>
  );
}

function OutputTable({ data, className }) {
  if (data.length === 0) return <Table loading />;
  else {
    const columns = Object.keys(data[0]).map((col, i) => {
      const column = {
        title: col,
        dataIndex: col,
      };
      if (i === 0) return { ...column, fixed: true };
      else return column;
    });

    return (
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(row) => row.Body}
        pagination={false}
        bordered
        scroll={{ x: true }}
        className={className}
      />
    );
  }
}
