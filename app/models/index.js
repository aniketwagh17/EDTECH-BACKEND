const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
//mongoose.Promise = global.Promise;     //why this line
// This line is for avoiding depreciation warning in version 5 no need to use above line

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);

//new code added for Authorisation/Authentication, For that adding user model
db.users = require("./user.model")(mongoose);

module.exports = db;

