module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const auth = require("../middleware/auth");

    var router = require("express").Router();
  
    router.post("/register", user.register);

    router.post("/login", user.login);

    router.post("/welcome", auth ,user.welcome);

    app.use('/api/user', router);
}