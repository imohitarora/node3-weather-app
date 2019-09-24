const request = require("request");

const getWeatherStatus = (coordinates, place, callback) => {
  const url =
    "https://api.darksky.net/forecast/6f029133be33a5f0f6413b9707ba51c8/" +
    coordinates +
    "?units=si&exclude=[minutely,hourly,alerts,flags]";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.");
    } else if (body.error) {
      callback("Unable to find location.");
    } else {
      callback(undefined, {
        message:
          body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees outside. There is a " +
          body.currently.precipProbability +
          "% chance of rain in " +
          place
      });
    }
  });
};

module.exports = {
  forecast: getWeatherStatus
};
