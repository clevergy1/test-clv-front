require("babel-polyfill");
var express = require('express');
var cors = require("cors");
var bodyParser = require('body-parser');
// var DataAccess = require('./dal/DataAccess.js');
var bll = require("./bll/bll.js");


var port = process.env.PORT || 3000;

var server = express();
server.use(cors());
 server.use(express.static(__dirname + "/../www"));
server.use( bodyParser.json() );       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "false");
  res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
  next();
});

server.get('/', function (req, res) {
  // console.log("sono dentro",__dirname);
  res.render('index.html');
});

/*
usersstat
-------------------------------------------------------------------------------------------*/
// server.get("/usersstat_Read", bll.usersstat.Read);
/*-----------------------------------------------------------------------------------------*/

/*
users
-------------------------------------------------------------------------------------------*/
server.post("/users_GetUsersByRoleId", bll.users.GetUsersByRoleId);
server.post("/users_AddUser", bll.users.AddUser);
server.post("/users_AdminchangeUserPass", bll.users.AdminchangeUserPass);
server.post("/users_lockUser", bll.users.lockUser);
server.post("/users_UnlockUser", bll.users.UnlockUser);
server.post("/users_UpdUser", bll.users.UpdUser);
server.post("/users_removeUser", bll.users.RemoveUser);
server.post("/users_logO", bll.users.logO);
server.post("/users_logS", bll.users.logO);
server.post("/users_getUserO", bll.users.getUserO);
server.post("/users_getUserS", bll.users.getUserO);
/*-----------------------------------------------------------------------------------------*/

/*
roles
-------------------------------------------------------------------------------------------*/
server.get("/roles_List", bll.roles.List);
/*-----------------------------------------------------------------------------------------*/

/*
projectsUsers
-------------------------------------------------------------------------------------------*/
server.post("/projectsUsers_Del", bll.projectsUsers.Del);
server.post("/projectsUsers_List", bll.projectsUsers.List);
server.post("/projectsUsers_Upsert", bll.projectsUsers.Upsert);
/*-----------------------------------------------------------------------------------------*/

/*
projects
-------------------------------------------------------------------------------------------*/
server.post("/projects_List", bll.projects.List);
server.post("/projects_Add", bll.projects.Add);
server.post("/projects_Update", bll.projects.Update);
server.post("/projects_Read", bll.projects.Read);
server.post("/projects_ListByUser", bll.projects.ListByUser);
/*-----------------------------------------------------------------------------------------*/

/*
installations
-------------------------------------------------------------------------------------------*/
server.post("/installations_List", bll.installations.List);
server.post("/installations_Add", bll.installations.Add);
/*-----------------------------------------------------------------------------------------*/

server.get("/test", bll.projects.test);

server.listen(port);
