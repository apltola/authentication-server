const buildValidations = require('./build-utils/build-validations');
const commonConfig = require('./build-utils/webpack.common');
const webpackMerge = require('webpack-merge');

const addons = (addonsArg) => {
  
  // Normalize array of addons (flatten)
  let addons = [...[addonsArg]] 
    .filter(Boolean); // If addons is undefined, filter it out

  return addons.map(addonName =>
    require(`./build-utils/addons/webpack.${addonName}.js`)
  );
};

// 'env' will contain the environment variable from package.json scripts
module.exports = env => {

  // use 'buildValidations' to check for the 'env' flag
  if (!env) {
    throw new Error(buildValidations.ERR_NO_ENV_FLAG);
  }

  // Select which Webpack configuration to use 
  const envConfig = require(`./build-utils/webpack.${env.env}.js`);
  
  // 'webpack-merge' will combine our shared configurations, the 
  // environment specific configurations and any addons we are
  // including
  const mergedConfig = webpackMerge(
    commonConfig,
    envConfig,
    ...addons(env.addons)
  );

  // Then return the final configuration for Webpack
  return mergedConfig;
};