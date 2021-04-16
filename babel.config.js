module.exports = function (api) {
  api.cache(true);

  const presets = [
    'babel-preset-expo',
    // 'module:metro-react-native-babel-preset',
    // 'module:react-native-dotenv'
  ]

  const plugins = [
    ["module:react-native-dotenv", {
      "moduleName": "@appconfig",
      "path": ".appOptions",
      "blacklist": null,
      "whitelist": null,
      "safe": true,
      "allowUndefined": true
    }],
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blacklist": null,
      "whitelist": null,
      "safe": false,
      "allowUndefined": true
    }, 'token-file']
  ]


  return {
    presets,
    plugins
  };
};
