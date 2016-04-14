var CryptoJS = require("crypto-js");

var key = "7061737323313233";

exports.ecr = function(obj) {
    return CryptoJS.AES.encrypt(obj.trim(), key).toString();
};
exports.dcr = function(obj) {
    return JSON.parse(CryptoJS.AES.decrypt(obj, key).toString(CryptoJS.enc.Utf8));
};

exports.rabbitEcr = function(obj){
    return CryptoJS.Rabbit.encrypt(obj, key).toString();
};

exports.rabbitDcr = function(obj){
    return CryptoJS.Rabbit.decrypt(obj, key).toString();
};