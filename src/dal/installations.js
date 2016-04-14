require("babel-polyfill");
import {MongoClient} from "mongodb";
import * as moment from "moment";
var DataAccessHelper = require('./DataAccessHelper.js');

var COLLECTION = "installations";
var operationResult = {"retval":false,"dataObject":{}};

export function Add(req, res, next) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
                operationResult.retVal = false;
                operationResult.dataObject = "Error occured: " + err;
                reject(operationResult);
                console.log(err);
                return;
            }

            // reperisco nuovo id
            var id = 0;
            var counters = db.collection(COLLECTION);
            counters.find().sort({ "_id": -1 }).limit(1).toArray().then(function (docs) {
                if (docs.length <= 0) {
                    console.log("not found");
                    id = 1;
                }
                else {
                    id = docs[0]._id + 1;
                }
                //=====================================================================================
                // col nuovo id aggiungo il record
                var Model = {
                    "_id": id,
                    "projectId": req.body.projectId,
                    "description": req.body.description,
                    "address": {
                        "street": req.body.street,
                        "latitude": Number(req.body.latitude),
                        "longitude": Number(req.body.longitude),
                        "altitude": Number(req.body.altitude)
                    },
                    "maintenanceMode": true,
                    "isOnLine": false,
                    "stato": 0,
                    "lastRec": moment(new Date()).toISOString(),
                    "iwwa": false,
                    "note": req.body.note
                }
                var installations = db.collection(COLLECTION);
                installations.update(
                    { _id: Model._id },
                    Model,
                    { upsert: true }
                ).then(function (result) {
                    if (result.result.ok <= 0) {
                        console.log("installations Add error");
                        operationResult.retVal = false;
                        operationResult.dataObject = "error";
                        resolve(operationResult);
                    }
                    else {
                        console.log("installations Add");
                        result.retVal = true;
                        result.dataObject = "installations Add";
                        resolve(operationResult);
                        sencondary_Add(Model);
                    }
                });
                //=====================================================================================
            });
        });
    }); //end promise
}

export function List (req, res, next) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
                result.retVal = false;
                result.dataObject = "Error occured: " + err;
                reject(result);
                console.log(err);
                return;
            }

            var installations = db.collection(COLLECTION);
            installations.find({ "projectId": req.body.projectId }).toArray().then(function (docs) {
                if (docs.length <= 0) {
                    console.log("not found");
                    operationResult.retVal = false;
                    operationResult.dataObject = "not found";
                    resolve(operationResult);
                }
                else {
                    operationResult.retVal = true;
                    operationResult.dataObject = docs;
                    resolve(operationResult);
                }
            });
        });
    }); //end promise
}

function sencondary_Add(Model) {
    var mongodb_url = DataAccessHelper.secondary_db() + "clv-" + Model._id;
    MongoClient.connect(mongodb_url, function (err, db) {
        if (err) {
            console.log(err);
            return;
        }
        var installations = db.collection(COLLECTION);
        installations.update(
            { _id: Model._id },
            Model,
            { upsert: true }
        ).then(function (result) {
            if (result.result.ok <= 0) {
                console.log("sencondary_Add installations error");
            }
            else {
                console.log("sencondary_Add installations");
            }
        });
    });
}


function getNextSequence(db) {
    //var retVal = 0;
    //var counters = db.collection(COLLECTION);
    //var doc = counters.find().sort({ "_id": -1 }).limit(1).toArray();
    //console.log("getNextSequence", doc);
    //return doc;

    return new Promise(function (resolve, reject) {
        var retVal = 0;
        var counters = db.collection(COLLECTION);
        counters.find().sort({ "_id": -1 }).limit(1).toArray().then(function (docs) {
            if (docs.length <= 0) {
                // console.log("not found");
                retVal = 0;
                resolve(retVal);
            }
            else {
                // console.log(docs[0]._id);
                retVal = docs[0]._id;
                resolve(retVal);
            }
        });
    });

}
