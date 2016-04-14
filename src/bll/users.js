require("babel-polyfill");
var DataAccess = require('../dal/DataAccess.js');

export async function logO (req, res, next) {
    try {
        var response = await DataAccess.users.logO (req, res, next);
        console.log("logO response",response);
        res.json(response);
    } catch (e) {
        console.log(e);
    }
}

export async function getUserO (req, res, next) {
    try {
        var response = await  DataAccess.users.getUserO (req, res, next);
        console.log(response);
        res.json(response);
    } catch (e) {
        console.log(e);
    }
}

export async function GetUsersByRoleId (req, res, next) {
    try {
        var response = await  DataAccess.users.GetUsersByRoleId (req, res, next);
        console.log(response);
        res.json(response);
    } catch (e) {
        console.log(e);
    }
}

export async function GetUserByUserName (req, res, next) {
    try {
        var response = await  DataAccess.users.GetUsersByRoleId (req, res, next);
        console.log(response);
        res.json(response);
    } catch (e) {
        console.log(e);
    }
}

export async function AddUser (req, res, next) {
    try {
        var response = await  DataAccess.users.AddUser (req, res, next);
        console.log(response);
        res.json(response);
    } catch (e) {
        console.log(e);
    }
}

export async function RemoveUser (req, res, next) {
    try {
        var response =  await DataAccess.users.RemoveUser (req, res, next);
        console.log(response);
        res.json(response);
    } catch (e) {
        console.log(e);
    }
}

export async function AdminchangeUserPass (req, res, next) {
    try {
        var response = await  DataAccess.users.AdminchangeUserPass (req, res, next);
        console.log(response);
        res.json(response);
    } catch (e) {
        console.log(e);
    }
}

export async function lockUser (req, res, next) {
    try {
        var response = await  DataAccess.users.lockUser (req, res, next);
        console.log(response);
        res.json(response );
    } catch (e) {
        console.log(e);
    }
}

export async function UnlockUser (req, res, next) {
    try {
        var response = await  DataAccess.users.UnlockUser (req, res, next);
        console.log(response);
        res.json(response);
    } catch (e) {
        console.log(e);
    }
}

export async function UpdUser (req, res, next) {
    try {
        var response = await  DataAccess.users.UpdUser (req, res, next);
        console.log(response);
        res.json(response);
    } catch (e) {
        console.log(e);
    }
}
