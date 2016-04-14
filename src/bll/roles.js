require("babel-polyfill");
var DataAccess = require("../dal/DataAccess.js");

export async function List (req, res, next) {
    try {
        var response = await DataAccess.roles.List (req, res, next);
        console.log(response);
        res.json(response);
    } catch (e) {
        console.log(e);
        res.json({"error":e});
    }
}
