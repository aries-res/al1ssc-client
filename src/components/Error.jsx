import { Result } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

export default function Error({ err }) {
  const errorMessage = !err.response
    ? "Error: Network Error"
    : `Error ${err.response.status}: ${err.response.statusText}`;
  return (
    <Result
      icon={<ExclamationCircleFilled style={{ color: "#ff0003" }} />}
      //   status="warning"
      title="Oops! Something went wrong"
      subTitle={errorMessage}
    />
  );
}
