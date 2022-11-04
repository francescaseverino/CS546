const peopleRoutes = require("./people");
// const path = require("path");

const constructorMethod = (app) => {
  app.use('/', peopleRoutes);
  app.use("*", (req, res) => {
    res.redirect("http://localhost:3000");
  });
};

module.exports = constructorMethod;