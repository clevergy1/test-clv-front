var MongoClient = require('mongodb').MongoClient;
var DataAccessHelper = require('./DataAccessHelper.js');

var COLLECTION = "usersRoles";
var operationResult = {"retval":false,"dataObject":{}};

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
            collection.aggregate( [ {$lookup:{from : "users", localField: "_id", foreignField : "roleId", as : "Users"}},]).toArray(function (err, docs) {
                if (err) {
                    operationResult.retVal = false;
                    operationResult.dataObject = "Error occured: " + err;
                    resolve(operationResult);
                    console.log(err);
                    return;
                }
                if (docs.length === 0) {
                    operationResult.retVal = false;
                    operationResult.dataObject = "no data";
                    resolve(operationResult);
                    console.log(err);
                    return;
                }
                var measurements = [];
                docs.forEach(function (doc) {
                    var Model = {"roleId": "", "roleName":"", "countUser": 0};
                    Model.roleId = doc._id;
                    Model.roleName = doc.roleName;
                    Model.countUser = doc.Users.length;
                    measurements.push(Model);
                });
                operationResult.retVal = true;
                operationResult.dataObject = measurements;
                resolve(operationResult);
            });
        });
    }); //end promise
};

exports.copy2secondary = function(projectId) {
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
  });;

}
