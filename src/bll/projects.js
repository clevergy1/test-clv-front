require("babel-polyfill");
var DataAccess = require("../dal/DataAccess.js");

export async function test (req, res, next) {
    try {
        var response = await DataAccess.projects.test (req, res, next);
        console.log(response);
        res.json(response);
    } catch (e) {
        console.log(e);
        res.json({"error":e});
    }
}

export async function List (req, res, next) {
    try {
        var response = await DataAccess.projects.List (req, res, next);
        console.log(response);
        res.json(response);
    } catch (e) {
        console.log(e);
        res.json({"error":e});
    }
}

export async function ListByUser (req, res, next) {
  try {
      var response = await DataAccess.projects.ListByUser (req, res, next);
      console.log(response);
      res.json(response);
  } catch (e) {
      console.log(e);
      res.json({"error":e});
  }
}

export async function Read (req, res, next) {
  try {
      var response = await DataAccess.projects.Read (req, res, next);
      console.log(response);
      res.json(response);
  } catch (e) {
      console.log(e);
      res.json({"error":e});
  }
}

export async function Add (req, res, next) {
  try {
      var response = await DataAccess.projects.Add (req, res, next);
      console.log("projects add", response);
      res.json(response);
  } catch (e) {
      console.log(e);
      res.json({"error":e});
  }
}

export async function Update (req, res, next) {
  try {
      var response = await DataAccess.projects.Update (req, res, next);
      console.log(response);
      res.json(response);
  } catch (e) {
      console.log(e);
      res.json({"error":e});
  }
}
