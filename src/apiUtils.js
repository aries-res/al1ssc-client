import axios from "axios";
import { Link } from "react-router-dom";

const cmsBaseUrl = process.env.REACT_APP_CMS_API_URL;
const toolsBaseUrl = process.env.REACT_APP_TOOLS_API_URL;

// Map of collection types' enum values to their API requests
const collectionsApiRequests = {
  // sort order is important hence pass it in params
  news_posts: { apiRoute: "/news-posts", getParams: { _sort: "date:DESC" } },
  faqs: { apiRoute: "/faqs", getParams: { _sort: "serialNumber:ASC" } },
};

function getData({ apiRoute, getParams = {}, isAnalysisTool = false } = {}) {
  return async () => {
    const { data } = await axios({
      url: apiRoute.startsWith("/") ? apiRoute : "/" + apiRoute,
      baseURL: isAnalysisTool ? toolsBaseUrl : cmsBaseUrl,
      params: getParams, // they will still work even when passed as params
    });
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve(data), 5000);
    // });
    return data;
  };
}

// Internal or External aware Links
function InExLink(props) {
  return /^https?:\/\//.test(props.to) ? (
    <a href={props.to} {...props} target="_blank" rel="noreferrer noopener" />
  ) : (
    <Link {...props} />
  );
}

export { cmsBaseUrl, collectionsApiRequests, getData, InExLink };
