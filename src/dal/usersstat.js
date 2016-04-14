var MongoClient = require('mongodb').MongoClient;
var DataAccessHelper = require('./DataAccessHelper.js');

var COLLECTION = "memberShip";
var operationResult = {"retval":false,"dataObject":{}};

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

            var collection = db.collection(COLLECTION);

            var totUser = 0;
            var Locked = 0;
            var notLocked = 0;

            collection.count(function (err, count) {
                totUser = count;
                collection.count({"isLockedOut": false}, function (err, count) {
                    notLocked = count;
                    collection.count({"isLockedOut": true}, function (err, count) {
                        Locked = count;
                        var dataObject = {"totUser":totUser, "Locked":Locked,"notLocked":notLocked};
                        operationResult.retVal = true;
                        operationResult.dataObject = dataObject;
                        resolve(operationResult);
                    });
                });
            });
        }); //MongoClient.connect
    }); //end Promise
};
