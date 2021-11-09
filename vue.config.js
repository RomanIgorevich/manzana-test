module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/manzana-test/" : "/",
  productionSourceMap: false,
  filenameHashing: true,
};
