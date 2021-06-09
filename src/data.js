export const pageRoutes = [
  {
    pageName: "Home",
    path: "/",
  },
  {
    pageName: "Mission",
    path: "/mission",
    accessedThrough: "header",
    redirectsTo: "/mission/about-adityal1",
    children: [
      { pageName: "About Aditya-L1", path: "/about-adityal1" },
      { pageName: "Instruments", path: "/instruments" },
      { pageName: "Science Working Groups", path: "/science-working-groups" },
    ],
  },
  {
    pageName: "Data Products",
    path: "/data-products",
    accessedThrough: "header",
    redirectsTo: "/data-products/level-descriptions",
    children: [
      { pageName: "Level Descriptions", path: "/level-descriptions" },
      { pageName: "Quick look browser", path: "/quick-look-browser" },
      { pageName: "Catalogs", path: "/catalogs" },
      { pageName: "Analysis Tools", path: "/analysis-tools" },
      { pageName: "Data from payloads", path: "/data" },
    ],
  },
  {
    pageName: "Planning",
    path: "/planning",
    accessedThrough: "header",
    redirectsTo: "/planning/proposal",
    children: [
      { pageName: "Proposal Planner", path: "/proposal" },
      { pageName: "Data Volume Calculator", path: "/data-volume" },
      { pageName: "Orbit tool", path: "/orbit-tool" },
    ],
  },
  {
    pageName: "Media",
    path: "/media",
    accessedThrough: "header",
    redirectsTo: "/media/news",
    children: [
      { pageName: "News", path: "/news" },
      { pageName: "Gallery", path: "/gallery" },
    ],
  },
  {
    pageName: "Outreach",
    path: "/outreach",
    accessedThrough: "header",
  },
  {
    pageName: "Help",
    path: "/help",
    accessedThrough: "footer",
  },
];

export const HeaderDataSource = {
  logo: "/AL1SSC_title.svg",
  menu: pageRoutes.filter(
    (pageRoute) => pageRoute.accessedThrough === "header"
  ),
};

const combinedRoutes = [];
const pathPageNameMap = {};
pageRoutes.slice(1).forEach((pageRoute) => {
  const { path, pageName, redirectsTo } = pageRoute;
  combinedRoutes.push({ path, pageName, redirectsTo });
  pathPageNameMap[path] = pageName;
  if (pageRoute.children) {
    pageRoute.children.forEach((childRoute) => {
      const combinedPath = path + childRoute.path;
      combinedRoutes.push({
        path: combinedPath,
        pageName: childRoute.pageName,
      });
      pathPageNameMap[combinedPath] = childRoute.pageName;
    });
  }
});

export { combinedRoutes, pathPageNameMap };
