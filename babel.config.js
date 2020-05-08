module.exports = {
  presets: [
    "module:metro-react-native-babel-preset"
  ],
  plugins: [[
    "module-resolver", {
      extensions: [
        ".js", ".ts", ".tsx", ".json"
      ],
      alias: {
        "~": "./src"
      }
    }
  ]]
}
