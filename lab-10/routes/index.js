const apiRoute = require('./routesAPI');

const constructorMethod = (app) => {
  app.use('/', apiRoute);
  app.use('*', (req, res) => {
    res.redirect('http://localhost:3000/');
  });
};

module.exports = constructorMethod;