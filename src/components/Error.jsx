import { Result } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

export default function Error({ response }) {
  const errorMessage = `Error ${response.status}: ${response.statusText}`;
  return (
    <Result
      icon={<ExclamationCircleFilled style={{ color: "#ff0003" }} />}
      //   status="warning"
      title="Oops! Something went wrong"
      subTitle={errorMessage}
    />
  );
}
