const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;

//define paths for express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mohit Arora"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Mr. Mohit!",
    name: "Mohit Arora"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    help: "Help me brother!!!",
    name: "Mohit Arora"
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  geocode.geocode(req.query.address, (error, { coordinates, place } = {}) => {
    if (error) {
      return res.send({ error });
    }
    weather.forecast(coordinates, place, (error, { message, hourly }) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        forecast: message,
        address: req.query.address,
        summary: hourly
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search item"
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Woops, looks like you lost your path"
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
