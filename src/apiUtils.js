import axios from "axios";

const cmsBaseUrl = "http://localhost:1339";

// Map of collection types' enum values to their API routes
const collectionAPIRoutes = {
  news_posts: "/news-posts",
  faqs: "faqs?_sort=serialNumber:ASC",
};

function getData(apiRoute) {
  return async () => {
    const { data } = await axios({
      url: apiRoute.startsWith("/") ? apiRoute : "/" + apiRoute,
      baseURL: cmsBaseUrl,
      // params: params,
    });
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve(data), 5000);
    // });
    return data;
  };
}

export { cmsBaseUrl, collectionAPIRoutes, getData };
