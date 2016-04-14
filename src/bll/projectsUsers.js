require("babel-polyfill");
var DataAccess = require("../dal/DataAccess.js");

export async function Del (req, res, next) {
  try {
      var response = await DataAccess.installations.Del (req, res, next);
      console.log(response);
      res.json(response);
  } catch (e) {
      console.log(e);
      res.json({"error":e});
  }
}

export async function List (req, res, next) {
  try {
      var response = await DataAccess.installations.List (req, res, next);
      console.log(response);
      res.json(response);
  } catch (e) {
      console.log(e);
      res.json({"error":e});
  }
}

export async function Upsert (req, res, next) {
  try {
      var response = await DataAccess.installations.Upsert (req, res, next);
      console.log(response);
      res.json(response);
  } catch (e) {
      console.log(e);
      res.json({"error":e});
  }
}
