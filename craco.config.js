const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1890ff",
              "@font-family": "'Open Sans', Roboto, sans-serif",
            }, //#1890ff
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
