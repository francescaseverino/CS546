const apiRoute = require('./routesAPI');

const constructorMethod = (app) => {
  app.use('/', apiRoute);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;