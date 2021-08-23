import React from "react";
import OrbitTool from "./OrbitTool";

export default function AnalysisTool({ toolName }) {
  if (toolName === "orbit_tool") return <OrbitTool />;
  else return null;
}
