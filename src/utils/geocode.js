const request = require("request");

const geocode = (address, callback) => {
  debugger;
  const geocodeUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaW1vaGl0YXJvcmEiLCJhIjoiY2swcTkwZnZyMDVwaTNnbnk0b2cyNWh6OCJ9.wfBD01Shxfdt0KjH0BzgkA&limit=1";
  request({ url: geocodeUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to access the location api!");
    } else if (body.features.length === 0) {
      callback("Unable to find location!");
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      callback(undefined, {
        coordinates: latitude + "," + longitude,
        place: body.features[0].place_name
      });
    }
  });
};

module.exports = {
  geocode: geocode
};
