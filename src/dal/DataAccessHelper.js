require("babel-polyfill");
var MongoClient = require("mongodb").MongoClient;

/*
var clvdb_connection = "mongodb://ser-clevtest/clv-db";
var secondary_db_connection = "mongodb://ser-clevtest/";
*/

var clvdb_connection = "mongodb://localhost/clv-db";
var secondary_db_connection = "mongodb://localhost/";

exports.clvdb = function () {
    return clvdb_connection;
}
exports.secondary_db = function () {
    return secondary_db_connection;
}
