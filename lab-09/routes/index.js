const sortarrayRoute = require("./sortArray");

const constructorMethod = (app) => {
    app.use('/', sortarrayRoute);
    app.use("*", (req, res) => {
        res.redirect('http://localhost:3000');
    });
};

module.exports = constructorMethod;