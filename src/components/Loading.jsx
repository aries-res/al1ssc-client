import { Spin } from "antd";

export default function Loading({
  spinnerSize = "large",
  minHeight = "300px",
}) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size={spinnerSize} />
    </div>
  );
}
