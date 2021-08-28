import React, { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const OrbitTool = lazy(() => import("./OrbitTool")); // for code splitting

export default function AnalysisTool({ toolName }) {
  if (toolName === "orbit_tool")
    return (
      <Suspense fallback={<Loading />}>
        <OrbitTool />
      </Suspense>
    );
  else return null;
}
