import {MongoClient} from "mongodb";
import * as moment from "moment";
import * as uuid from "node-uuid";
var DataAccessHelper = require("./DataAccessHelper.js");

var COLLECTION = "projectsUsers";
var operationResult = {"retval":false,"dataObject":{}};

export function Del (req, res, next) {
    return new Promise(function(resolve, reject) {
        var id = req.body.id;
         MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
              operationResult.retVal = false;
              operationResult.dataObject = "Error occured: " + err;
              reject(operationResult);
              console.log(err);
              return;
            }

            var projectsUsers = db.collection(COLLECTION);
            projectsUsers.remove(
                {
                    "_id": id
                }
            ).then(function (result) {
                //console.log("projectId", projectId);
                //console.log("userId",userId);
                //console.log(result.result.ok);
                //console.log(result.result.n);
                if (result.result.n <=0) {
                  operationResult.retVal = false;
                  operationResult.dataObject = "error";
                  resolve(operationResult);
                }
                else {
                    console.log("projectsUsers Del");
                    operationResult.retVal = true;
                    operationResult.dataObject = "projectsUsers Del";
                    resolve(operationResult);
                }
            });
        });
    }); //end promise
};

export function List (req, res, next) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
                operationResult.retVal = false;
                operationResult.dataObject = "Error occured: " + err;
                reject(operationResult);
                console.log(err);
                return;
            }

            var collection = db.collection(COLLECTION);
            var users_lookup = {from: "users", localField: "userId", foreignField: "_id", as: "users"};
            var projects_lookup = { from: "projects", localField: "installationId", foreignField: "_id", as: "projects" };
            var userId_match = {"userId" : req.body.userId};
            collection.aggregate([
                {$lookup : users_lookup},
                { $lookup: projects_lookup },
                {$match : userId_match}
            ]).toArray().then(function (docs) {
                if (docs.length <=0) {
                    console.log("not found");
                    operationResult.retVal = false;
                    operationResult.dataObject = "not found";
                    resolve(operationResult);
                    return;
                }

                var projectsUsers = [];
                docs.forEach(function (doc) {
                    var Model = { "projectId": "", "description": "" };
                    Model.projectId = doc.projectId;
                    Model.description = doc.projects[0].description;
                    installationsUsers.push(Model);
                });
                  operationResult.retVal = true;
                  operationResult.dataObject = projectsUsers;
                  resolve(operationResult);
            });
        });
    }); //end promise
};

export function Upsert (req, res, next) {
    return new Promise(function(resolve, reject) {
        var id = req.body.id;
        var userId = req.body.userId;

        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
                operationResult.retVal = false;
                operationResult.dataObject = "Error occured: " + err;
                reject(operationResult);
                console.log(err);
                return;
            }

            var _id = uuid.v4();
            var projectsUsers = db.collection(COLLECTION);
            var projectsUsersModel = {
                "_id": _id,
                "projectId": id,
                "userId" : userId
            };
            // debug
            console.log("projectsUsers Upsert", projectsUsersModel);
            projectsUsers.update(
                { "_id": _id },
                projectsUsersModel,
                {upsert:true}
            ).then(function (result) {
                //debug
                console.log("projectsUsers Upsert", result.result);
                if (result.result.ok <= 0) {
                    console.log("projectsUsers Upsert error");
                    operationResult.retVal = false;
                    operationResult.dataObject = "projectsUsers Upsert error";

                }
                else {
                    console.log("projectsUsers Upsert");
                    operationResult.retVal = true;
                    operationResult.dataObject = "projectsUsers Upsert";
                }
            });
        });
    }); //end promise
};
