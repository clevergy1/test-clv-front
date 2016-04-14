require("babel-polyfill");
import {MongoClient} from "mongodb";
import * as moment from "moment";
import * as crypto from "../services/crypto";
import * as passwordHash from "password-hash";
import * as uuid from "node-uuid";
var DataAccessHelper = require('./DataAccessHelper.js');

var COLLECTION = "users";
var operationResult = {"retval":false,"dataObject":{}};

export function logO (req, res, next) {
    return new Promise(function(resolve, reject) {
        var decrypted = crypto.dcr(req.body.a);
        var userName = decrypted.id;
        var password = decrypted.key;

        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
                operationResult.retVal = false;
                operationResult.dataObject = "Error occured: " + err;
                reject(operationResult);
                console.log(err);
                return;
            }

            var collection = db.collection(COLLECTION);
            var memberShip_lookup = {from : "memberShip", localField: "_id", foreignField : "_id", as : "memberShip"};
            var usersRoles_lookup = {from : "usersRoles", localField: "roleId", foreignField : "_id", as : "role"};
            var userName_match = {"userName" : userName.toLowerCase()};
            collection.aggregate([
                {$lookup : memberShip_lookup},
                {$lookup : usersRoles_lookup},
                {$match : userName_match}
            ], function (err, doc) {
                if (err) {
                    operationResult.retVal = false;
                    operationResult.dataObject = "Error occured: " + err;
                    reject(operationResult);
                    console.log(err);
                }
                else {

                    if (passwordHash.verify(password, doc[0].memberShip[0].userPassword) === true) {
                        if (doc[0].role[0].roleName.toLowerCase() === "operators") {
                            operationResult.retval = true;
                            operationResult.dataObject = doc[0]._id;
                            resolve(operationResult);
                        }
                        else {
                            console.log("Login failed: user not in role");
                            operationResult.retVal = false;
                            operationResult.dataObject = "Login failed: user not in role";
                            resolve(operationResult);
                        }
                    }
                    else {
                        console.log("Login failed: invalid password");
                        operationResult.retVal = false;
                        operationResult.dataObject = "Login failed: invalid password";
                        resolve(operationResult);
                    }
                }
            });
        });
    }); // end promise
};

export function getUserO (req, res, next) {
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
            collection.findOne({"_id": req.body.UserId},  function (err, doc) {
                if (err) {
                    operationResult.retVal = false;
                    operationResult.dataObject = "Error occured: " + err;
                    reject(operationResult);
                    console.log(err);
                }
                else {
                    // console.log("getUserO", result);
                    if (!doc){
                        operationResult.retVal = false;
                        operationResult.dataObject = "not found";
                        resolve(operationResult);
                    }
                    else {
                        operationResult.retVal = true;
                        operationResult.dataObject = doc.userName;
                        resolve(operationResult);
                    }
                }
            });
        });
    }); //end promise;
}

export function GetUsersByRoleId (req, res, next) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
                operationResult.retVal = false;
                operationResult.dataObject = "Error occured: " + err;
                reject(operationResult);
                console.log(err);
                return;
            }

            var roleId = "";
            if (req.body.roleId) {
               roleId = req.body.roleId;
            }
            var collection = db.collection(COLLECTION);
            var memberShip_lookup = {from: "memberShip", localField: "_id", foreignField: "_id", as: "memberShip"};
            var projectsUsers_lookup = { from: "projectsUsers", localField: "_id", foreignField: "userId", as: "projectsUsers" };
            var roleId_match = {"roleId" : roleId};
            var useName_match = {"userName": {$regex: req.body.searchString}};

            collection.aggregate([
                {$lookup : memberShip_lookup},
                { $lookup: projectsUsers_lookup },
                {$match : roleId_match} ,
                {$match : useName_match}
            ]).toArray().then(function (docs) {
                //console.log("users", docs);
                if (docs.length <=0) {
                    operationResult.retVal = false;
                    operationResult.dataObject = "not found";
                    resolve(operationResult);
                    return;
                }
                var users = [];
                docs.forEach(function (doc) {
                    var Model = {"userId": "", "userName":"", "isLockedOut": false, "totImpianti":0, "installations":[]};
                    Model.userId = doc._id;
                    Model.userName = doc.userName;
                    Model.email = doc.email;
                    Model.comment = doc.comment;
                    Model.isLockedOut = doc.memberShip[0].isLockedOut;
                    Model.totImpianti = doc.projectsUsers.length;
                    users.push(Model);
                });
                operationResult.retVal = true;
                operationResult.dataObject = users;
                resolve(operationResult);
            });
        });
    }); //end promise
};

export function GetUserByUserName (req, res, next) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
           if (err) {
               operationResult.retVal = false;
               operationResult.dataObject = "Error occured: " + err;
               reject(operationResult);
               console.log(err);
               return;
           }
           // ==========================================================
           var collection = db.collection(COLLECTION);
           var memberShip_lookup = {from: "memberShip", localField: "_id", foreignField: "_id", as: "memberShip"};
           var projectsUsers_lookup = { from: "projectsUsers", localField: "_id", foreignField: "userId", as: "projectsUsers" };
           var useName_match = {"userName": req.body.userName};

           collection.aggregate([
               {$lookup : memberShip_lookup},
               {$lookup: projectsUsers_lookup},
               {$match : useName_match}
           ]).toArray().then(function (docs){
               if (docs.length <=0) {
                   operationResult.retVal = false;
                   operationResult.dataObject = "not found";
                   resolve(operationResult);
                   return;
               }
               var users = [];
               docs.forEach(function (doc) {
                   var Model = {"userId": "", "userName":"", "isLockedOut": false, "totImpianti":0, "installations":[]};
                   Model.userId = doc.id;
                   Model.userName = doc.userName;
                   Model.email = doc.email;
                   Model.comment = doc.comment;
                   Model.isLockedOut = doc.memberShip[0].isLockedOut;
                   Model.totImpianti = doc.projectsUsers.length;

                   var collection = db.collection("projectsUsers");
                   var projects_lookup = { from: "projects", localField: "projectsId", foreignField: "_id", as: "projects" };
                   var userId_match = {"userId" : doc.id};
                   collection.aggregate([
                       { $lookup: projects_lookup },
                       {$match : userId_match}
                   ]).toArray().then(function (docs){
                       if (docs.length>0) {
                           docs.forEach(function (doc) {
                               Model.projects = doc.projects;
                               users.push(Model);
                               operationResult.retVal = true;
                               operationResult.dataObject = users;
                               resolve(operationResult);
                           });
                       }
                       else {
                           users.push(Model);
                           operationResult.retVal = true;
                           operationResult.dataObject = users;
                           resolve(operationResult);
                       }
                   });
               });
           });

           // ==========================================================
       });
    }); // end promise
};

export function AddUser (req, res, next) {
    return new Promise(function(resolve, reject) {
        var decrypted = crypto.dcr(req.body.a);
        var userName = decrypted.id;
        var password = decrypted.key;
        var roleId = decrypted.roleId;
        var comment = decrypted.comment;
        var email = decrypted.email;

        var hashedPassword = passwordHash.generate(password);
        var id = uuid.v4();

        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
              if (err) {
                operationResult.retVal = false;
                operationResult.dataObject = "Error occured: " + err;
                reject(operationResult);
                console.log(err);
                return;
            }

            var userModel = {
                "userName" : userName,
                "email" : email,
                "comment" : comment,
                "roleId" : roleId,
                "dtCreation": moment(new Date()).toISOString()
            };
            var users = db.collection(COLLECTION);
            users.update(
                {_id: id},
                userModel,
                {upsert:true}
            ).then(function (doc) {
                if (doc.result.ok <= 0) {
                    console.log("user add error");
                    operationResult.retVal = false;
                    operationResult.dataObject = "Error";
                    resolve(operationResult);
                }
                else {
                    var memberShipModel ={
                        "userPassword": hashedPassword,
                        "isLockedOut": false
                    };
                    var memberShip = db.collection("memberShip");
                    memberShip.update(
                        {_id: id},
                        memberShipModel,
                        {upsert:true}
                    ).then(function (doc) {
                        if (doc.result.ok <= 0) {
                            console.log("memberShip add error");
                            operationResult.retVal = false;
                            operationResult.dataObject = "Error";
                            resolve(operationResult);
                        }
                        else {
                            console.log("user created");
                            operationResult.retVal = true;
                            operationResult.dataObject = "user created";
                            resolve(operationResult);
                        }
                    });
                }
            });
        });
    }); //end promise
};

export function RemoveUser (req, res, next) {
    return new Promise(function(resolve, reject) {
        var decrypted = crypto.dcr(req.body.a);
        var userId = decrypted.id;
        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
                operationResult.retVal = false;
                operationResult.dataObject = "Error occured: " + err;
                reject(operationResult);
                console.log(err);
                return;
            }

            var memberShip = db.collection("memberShip");
            memberShip.remove({ _id: userId }).then(function (doc) {
                if (doc.result.nRemoved <= 0) {
                    console.log("remove memberShip error");
                    operationResult.retVal = false;
                    operationResult.dataObject = "Error";
                    resolve(operationResult);
                }
                else {
                    var projectsUsers = db.collection("projectsUsers");
                    projectsUsers.remove({ userId: userId }).then(function (doc) {
                        if (doc.result.nRemoved <= 0) {
                            console.log("remove projectsUsers error");
                            operationResult.retVal = false;
                            operationResult.dataObject = "Error";
                            resolve(operationResult);
                        }
                        else {
                            var users = db.collection(COLLECTION);
                            users.remove({ _id: userId }).then(function (doc) {
                                if (doc.result.nRemoved <= 0) {
                                    console.log("remove users error");
                                    operationResult.retVal = false;
                                    operationResult.dataObject = "Error";
                                    resolve(operationResult);
                                }
                                else {
                                    console.log("User deleted");
                                    operationResult.retVal = true;
                                    operationResult.dataObject = "User deleted";
                                    resolve(operationResult);
                                }
                            });
                        }
                    });
                }
            });
        });
    }); //end promise
};

export function AdminchangeUserPass (req, res, next) {
    return new Promise(function(resolve, reject) {
        var decrypted = crypto.dcr(req.body.a);
        var userId = decrypted.id;
        var newpassword = decrypted.newpassword;
        var hashedPassword = passwordHash.generate(newpassword);

        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
                operationResult.retVal = false;
                operationResult.dataObject = "Error occured: " + err;
                reject(operationResult);
                console.log(err);
                return;
            }

            var memberShipModel = {
                "userPassword": hashedPassword,
                "isLockedOut": false
            };
            var memberShip = db.collection("memberShip");
            memberShip.update(
                {_id: userId},
                memberShipModel,
                {upsert:true}
            ).then(function (doc) {
                if (doc.result.ok <= 0) {
                    console.log("AdminchangeUserPass error");
                    operationResult.retVal = false;
                    operationResult.dataObject = "Error";
                    resolve(operationResult);
                }
                else {
                    console.log("password changed");
                    operationResult.retVal = true;
                    operationResult.dataObject = "password changed";
                    resolve(operationResult);
                }
            });
        });
    }); //end promise
};

export function lockUser (req, res, next) {
    return new Promise(function(resolve, reject) {
        var decrypted = crypto.dcr(req.body.a);
        var userId = decrypted.id;
         MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
                operationResult.retVal = false;
                operationResult.dataObject = "Error occured: " + err;
                reject(operationResult);
                console.log(err);
                return;
            }

            var memberShip = db.collection("memberShip");
            memberShip.updateOne(
                {_id : userId},
                {
                    $set: { "isLockedOut" : true}
                }
            ).then(function (result) {
                //console.log(result.result);
                if (result.result.ok <= 0) {
                    console.log("lockUser error");
                    operationResult.retVal = false;
                    operationResult.dataObject = "Error";
                    resolve(operationResult);
                }
                else {
                    console.log("lockUser");
                    operationResult.retVal = true ;
                    operationResult.dataObject = "User locked";
                    resolve(operationResult);
                }
            });
         });
    }); //end promise
};

export function UnlockUser (req, res, next) {
    return new Promise(function(resolve, reject) {
        var decrypted = crypto.dcr(req.body.a);
        var userId = decrypted.id;
        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
                operationResult.retVal = false;
                operationResult.dataObject = "Error occured: " + err;
                reject(operationResult);
                console.log(err);
                return;
            }

            var memberShip = db.collection("memberShip");
            memberShip.updateOne(
                {_id : userId},
                {
                    $set: { "isLockedOut" : false}
                }
            ).then(function (doc) {
                if (doc.result.ok <= 0) {
                    console.log("UnlockUser error");
                    operationResult.retVal = false;
                    operationResult.dataObject = "Error";
                    resolve(operationResult);
                }
                else {
                    console.log("lockUser");
                    operationResult.retVal = true;
                    operationResult.dataObject = "User unlocked";
                    resolve(operationResult);
                }
            });
         });
    }); //end promise
};

export function UpdUser (req, res, next) {
    return new Promise(function(resolve, reject) {
        var decrypted = crypto.dcr(req.body.a);
        var userId = decrypted.id;
        var comment = decrypted.comment;
        var email = decrypted.email;

        MongoClient.connect(DataAccessHelper.clvdb(), function (err, db) {
            if (err) {
                operationResult.retVal = false;
                operationResult.dataObject = "Error occured: " + err;
                reject(operationResult);
                console.log(err);
                return;
            }

            var users = db.collection(COLLECTION);
            users.updateOne(
                {_id : userId},
                {
                    $set: {
                        "comment" : comment,
                        "email" : email
                    }
                }
            ).then(function (doc) {
                if (doc.result.ok <= 0) {
                    console.log("UpdUsert error");
                    operationResult.retVal = false;
                    operationResult.dataObject = "Error";
                    resolve(operationResult)
                }
                else {
                      console.log("UpdUser");
                      operationResult.retVal = true;
                      operationResult.dataObject = "User updated";
                      resolve(operationResult);
                }
            });
        });
    }); //end promise
};
