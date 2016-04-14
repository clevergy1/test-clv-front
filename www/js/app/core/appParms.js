(function ($) {

    $.appParms = (function (my) {
        //var _urlserver = 'http://clevergylab.clevergy.it/';
        //var _urlGlobal = 'http://clevergylab.clevergy.it/cyassrv/';
        //var _urlBase = "http://clevergylab.clevergy.it/cyassrv/s1.svc/";
        //var _urlHub = 'http://clevergylab.clevergy.it/cyassrv/signalr/hubs/';
        //var _rdp = "http://clevergylab.clevergy.it/cyassrv/rdp.ashx";

        var _urlserver = 'http://clevergylab2.clevergy.it/';
        var _urlGlobal = 'http://clevergylab2.clevergy.it/cyassrv/';
        var _urlBase = "http://localhost:3000/";
        var _urlHub = 'http://clevergylab2.clevergy.it/cyassrv/signalr/hubs/';
        var _rdp = "http://clevergylab2.clevergy.it/cyassrv/rdp.ashx";

        //var _urlserver = 'http://pos3.clevergy.it/';
        //var _urlGlobal = 'http://pos3.clevergy.it/cyassrv/';
        //var _urlBase = "http://pos3.clevergy.it/cyassrv/s1.svc/";
        //var _urlHub = 'http://pos3.clevergy.it/cyassrv/signalr/hubs/';
        //var _rdp = "http://pos3.clevergy.it/cyassrv/rdp.ashx";
         
        //var _urlGlobal = 'http://localhost:56051/';
        //var _urlBase = "http://localhost:56051/S1.svc/";
        //var _urlHub = 'http://localhost:56051/signalr/hubs/';
        //var _rdp = "http://localhost:56051/rdp.ashx";
               
        var _key = '7061737323313233';
        var _iv = '7061737323313233';

        my.urlserver = function () {
            return _urlserver;
        };
        my.urlBase = function () {
            return _urlBase;
        };
        my.urlHub = function () {
            return _urlHub;
        };
        my.urlGlobal = function () {
            return _urlGlobal;
        }
        my.rdp = function () {
            return _rdp;
        };
        my.key = function () {
            return _key;
        };
        my.iv = function () {
            return _iv;
        };
        my.getTime = function () {
            return new Date().getTime();
        };
        return my;
    })({});

})(jQuery)
