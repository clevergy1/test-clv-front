require("babel-polyfill");
import {MongoClient} from "mongodb";
// import {DataAccessHelper} from "DataAccessHelper.js";
import * as moment from "moment";
import * as uuid from "node-uuid";
import * as bluebird from "bluebird";
// import * as roles from "roles.js";
var DataAccessHelper = require('./DataAccessHelper.js');
var roles = require('./roles.js')

var COLLECTION = "projects";
var operationResult = {"retval":false,"dataObject":{}};

export function test (req, res, next) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
                operationResult.retVal = false;
                operationResult.dataObject = "Error occured: " + err;
                reject(operationResult);
                console.log(err);
                return;
            }
            var projects = db.collection(COLLECTION);
            projects.find({}).toArray().then(function (docs) {
                if (docs.length <=0) {
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

    }); // end promise
};

export function List(req, res, next) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
              operationResult.retVal = false;
              operationResult.dataObject = "Error occured: " + err;
              reject(operationResult);
              console.log(err);
              return;
            }
            var projects = db.collection(COLLECTION);
            projects.find({ "description": { $regex: req.body.searchString } }).toArray().then(function (docs) {
                if (docs.length <=0) {
                  operationResult.retVal = false;
                  operationResult.dataObject = "not found";
                  resolve(operationResult);
                  console.log(err);
                }
                else {
                  operationResult.retval = true;
                  operationResult.dataObject = docs;
                  resolve(operationResult);
                }
            });
        });
    }); //end promise
};

export function ListByUser (req, res, next) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
              operationResult.retVal = false;
              operationResult.dataObject = "Error occured: " + err;
              reject(operationResult);
              console.log(err);
              return;
            }

            var collection = db.collection("projectsUsers");
            collection.aggregate([
                {$lookup: {from : "projects", localField: "projectId", foreignField : "_id", as : "projects"}},
                {$match : {"userId": req.body.userId}}
                //,{$match:{"projects.description": {$regex : req.body.searchString}}}
            ]).toArray().then(function (docs){
                if (docs.length <=0) {
                  operationResult.retVal = false;
                  operationResult.dataObject = "not found";
                  resolve(operationResult);
                  console.log(err);
                }
                else {
                  operationResult.retval = true;
                  operationResult.dataObject = docs;
                  resolve(operationResult);
                }
            });
        });
    }); // end promise
};

export function Read (req, res, next) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
              operationResult.retVal = false;
              operationResult.dataObject = "Error occured: " + err;
              reject(operationResult);
              console.log(err);
              return;
            }
            var projects = db.collection(COLLECTION);
            projects.find({ "_id": { $regex: req.body.id } }).toArray().then(function (docs) {
                if (docs.length <= 0) {
                  console.log("not found");
                  operationResult.retVal = false;
                  operationResult.dataObject = "not found";
                  resolve(operationResult);
                }
                else {
                  operationResult.retval = true;
                  operationResult.dataObject = docs;
                  resolve(operationResult);
                }
            });
        });
    }); //end promise
};

export function Add (req, res, next) {
    return new Promise(function(resolve, reject) {
        var projectId = uuid.v4();
        var Model = {
            "_id": projectId,
            "description" : req.body.description,
            "address" : {
                "street": req.body.address,
                "latitude": req.body.latitude,
                "longitude": req.body.longitude,
                "altitude": req.body.altitude
            }
        };

        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
              console.log("error:", err);
              operationResult.retval = false;
              operationResult.dataObject = "Error occured: " + err;
              reject(operationResult);
              return;
            }
        var projects = db.collection(COLLECTION);
            projects.update(
                { _id: Model._id },
                Model,
                {upsert:true}
            ).then(function (doc) {
                if (doc.result.ok <= 0) {
                  operationResult.retVal = false;
                  operationResult.dataObject = "projects Add error";
                  resolve(operationResult);
                }
                else {
                    operationResult.retval = true;
                    operationResult.dataObject = "projects Add";
                    resolve(operationResult);
                    sencondary_Add(Model);
                    //copyRoles(Model._id);
                }
            });
        });
    }); //end promise
};

function sencondary_Add(Model) {
  var mongodb_url = DataAccessHelper.secondary_db() + "clv-" + Model._id;
  MongoClient.connect(mongodb_url, function (err, db) {
    if (err) {
        console.log(err);
        return;
    }
    var projects = db.collection(COLLECTION);
    projects.update(
        { _id: Model._id },
        Model,
        { upsert: true }
    ).then(function (result) {
        if (result.result.ok <= 0) {
            console.log("sencondary_Add projects Update error");
        }
        else {
            console.log("sencondary_Add projects Update");
        }
    });
  });
}

export function Update (req, res, next) {
    if (req.body.id=="") {
      res.json({
          retval: false,
          data: "id is mandatory"
      });
      return;
    }
    var Model = {
        "_id": req.body.id,
        "description": req.body.description,
        "address": {
            "street": req.body.address,
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
            "altitude": req.body.altitude
        }
    };

    MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
        if (err) {
            console.log("error:", err);
            operationResult.retval = false;
            operationResult.dataObject = "Error occured: " + err;
            reject(operationResult);
            return;
        }
        var projects = db.collection(COLLECTION);
        projects.update(
            { _id: Model._id },
            Model,
            { upsert: false }
        ).then(function (result) {
            if (result.result.n <= 0) {
                operationResult.retval = false;
                operationResult.dataObject = "projects Update error";
                resolve(operationResult);
            }
            else {
                console.log("projects Update");
                secondary_Update(Model);
                operationResult.retval = true;
                operationResult.dataObject = "projects Update";
                resolve(operationResult);
            }
        });
    });
};

 function secondary_Update(Model) {
    var mongodb_url = DataAccessHelper.secondary_db() + "clv-" + Model._id;
    MongoClient.connect(mongodb_url, function (err, db) {
      if (err) {
          console.log(err);
          return;
      }
      var projects = db.collection(COLLECTION);
      projects.update(
          { _id: Model._id },
          Model,
          { upsert: true }
      ).then(function (result) {
          if (result.result.ok <= 0) {
              console.log("secondary_Update projects Update error");
          }
          else {
              console.log("secondary_Update projects Update");
          }
      });
    });
}

function copyRoles(projectId) {
  console.log("copyRoles projectId",projectId);
  MongoClient.connect(DataAccessHelper.clvdb(), function (err, source) {
      if (err) {
          console.log(err);
      }
      else {
        console.log("copyRoles source connection open");
        var sourceCollection = source.collection("usersRoles");
        sourceCollection.find({}).toArray().then(function (sourcedocs) {
          console.log("roles copyCollection", sourcedocs);
          var mongodb_url = DataAccessHelper.secondary_db() + "clv-" + projectId;
          MongoClient.connect(mongodb_url, function (err, target) {
            if (err) {
                console.log(err);
            }
            else {
                var targetCollection = target.collection("usersRoles");
                sourcedocs.forEach(function (doc) {
                    targetCollection.update(
                      {_id: doc._id},
                      doc,
                      {upsert:true}
                    ).then(function (result) {
                      if (result.result.ok <= 0) {
                          console.log("usersRoles copyCollection error");
                      }
                      else {
                          console.log("usersRoles copyCollection Update");
                      }
                    });
                });
            }
          });
        });
      } //else
  });
}
