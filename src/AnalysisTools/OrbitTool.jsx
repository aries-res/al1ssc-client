import React, { useState } from "react";
import { useQuery, useQueries } from "react-query";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-dist-min";

import { getData } from "../apiUtils";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Plot = createPlotlyComponent(Plotly);
const axisLayout = { exponentformat: "e", range: 1.15 };

export default function OrbitTool() {
  const bodiesQuery = useQuery(
    "orbit-tool-bodies",
    getData({ apiRoute: "/orbit-tool/bodies", isAnalysisTool: true }),
    { refetchOnWindowFocus: false }
  );

  if (bodiesQuery.isLoading) return <Loading />;
  if (bodiesQuery.error) return <Error response={bodiesQuery.error.response} />;
  return (
    <>
      <OrbitToolInput bodies={bodiesQuery.data} />
      <OrbitPlot3D bodies={bodiesQuery.data} />
    </>
  );
}

function OrbitPlot3D({ bodies }) {
  const [plotLayout, setPlotLayout] = useState({
    width: 800,
    height: 600,
    title: "3D Orbit Tool",
    xaxis: axisLayout,
    yaxis: axisLayout,
    zaxis: axisLayout,
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

  useQueries(
    bodies.map((body) => {
      return {
        queryKey: ["orbitData", body.name],
        queryFn: getData({
          apiRoute: "/orbit-tool",
          getParams: {
            timeStart: "2021-01-06T00:00:00",
            timeStop: "2022-01-06T00:00:00",
            timeStep: "2d",
            body: body.body_id,
          },
          isAnalysisTool: true,
        }),
        onSuccess: (data) => {
          setPlotData(
            plotData.concat({
              ...data,
              type: "scatter3d",
              mode: "lines",
            })
          );
        },
        refetchOnWindowFocus: false,
      };
    })
  );

  return <Plot data={plotData} layout={plotLayout} />;
}

function OrbitToolInput({ bodies }) {
  return null;
}
