(function($) {
    $.DataAccess = (function(my) {
        //Roles
        //========================================================================================
        my.roles_List = function() {
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                datatype: 'json',
                url: urlBase + 'roles_List',
                data: { DateCtrl: new Date().getTime() },
                type: 'GET',
                beforeSend: function() { },
                complete: function() { },
                error: function(xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //Users Operations
        //========================================================================================
        my.users_GetUsersByRoleId = function (roleId, searchString, projectId) {
            var urlBase = $.appParms.urlBase();
            var msg = {
                "roleId": roleId,
                "searchString": searchString,
                "projectId": projectId,
                "DateCtrl": new Date().getTime()
            };
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'users_GetUsersByRoleId',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.users_GetUserByUserName = function (username) {
            var urlBase = $.appParms.urlBase();
            var msg = { userName: username, DateCtrl: new Date().getTime() };
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'users_GetUserByUserName',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.users_AddUser = function (UserName, Password, UserRole, UserComment, UserEmail) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var obj = {
                id: UserName,
                key: Password,
                roleId: UserRole,
                comment: UserComment,
                email: UserEmail
            };
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), m_key);
            var tosend = encrypted.toString();
            var msg = {
                "a": tosend
            }
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'users_AddUser',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.users_AdminchangeUserPass = function (userId, newpassword) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var obj = {
                id: userId,
                newpassword: newpassword
            };
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), m_key);
            var tosend = encrypted.toString();
            var msg = {
                "a": tosend
            }
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'users_AdminchangeUserPass',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.users_lockUser = function (userId) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var obj = {
                id: userId
            };
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), m_key);
            var tosend = encrypted.toString();
            var msg = {
                "a": tosend
            }
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'users_lockUser',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.users_UnlockUser = function (userId) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var obj = {
                id: userId
            };
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), m_key);
            var tosend = encrypted.toString();
            var msg = {
                "a": tosend
            }
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'users_UnlockUser',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.users_UpdUser = function (userId, UserComment, UserEmail) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var obj = {
                id: userId,
                comment: UserComment,
                email: UserEmail
            };
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), m_key);
            var tosend = encrypted.toString();
            var msg = {
                "a": tosend
            }
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'users_UpdUser',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        }
        my.users_removeUser = function (userId) {
            var urlBase = $.appParms.urlBase();
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var obj = {
                id: userId
            };
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), m_key);
            var tosend = encrypted.toString();
            var msg = {
                "a": tosend
            }
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'users_removeUser',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.users_logO = function (username, password) {
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var obj = {
                id: username,
                key: password
            };
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), m_key);
            var tosend = encrypted.toString();
            var msg = {
                "a": tosend
            }
            var urlBase = $.appParms.urlBase(); // $.appParms.urlGlobal();
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'users_logO',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.users_getUserO = function (UserId) {
            var urlBase = $.appParms.urlBase();
            var msg = { "UserId": UserId, "DateCtrl": new Date().getTime() };
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'users_getUserO',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.users_logS = function (username, password) {
            var m_key = $.appParms.key()
            var m_iv = $.appParms.iv();
            var key = CryptoJS.enc.Utf8.parse(m_key);
            var iv = CryptoJS.enc.Utf8.parse(m_iv);
            var obj = {
                id: username,
                key: password
            };
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), m_key);
            var tosend = encrypted.toString();
            var msg = {
                "a": tosend
            }
            var urlBase = $.appParms.urlBase(); // $.appParms.urlGlobal();
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'users_logS',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.users_getUserS = function (UserId) {
            var urlBase = $.appParms.urlBase();
            var msg = { "UserId": UserId, "DateCtrl": new Date().getTime() };
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'users_getUserS',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //projects
        //========================================================================================
        my.projects_Add = function(DesImpianto, Indirizzo, Latitude, Longitude, AltSLM) {
            var urlBase = $.appParms.urlBase();
            var msg = {
                description: DesImpianto,
                address: Indirizzo,
                latitude: Latitude,
                longitude: Longitude,
                altitude: AltSLM
            }
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'projects_Add',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                async: false,
                beforeSend: function() { },
                complete: function() { },
                error: function(xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.projects_Read = function (id) {
            var msg = {
                "id": id
            }
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'projects_Read',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function() { },
                complete: function() { },
                success: function(json) {
                    data = json.d;
                },
                error: function(xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.projects_List = function(userId,searchString) {
            var msg = {
                "userId": userId,
                "searchString": searchString
            }
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'projects_List',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function() { },
                complete: function() { },
                error: function(xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.projects_ListByUser = function (userId, searchString) {
            var msg = {
                "userId": userId,
                "searchString": searchString
            }
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'projects_ListByUser',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function() { },
                complete: function() { },
                error: function(xhr, status) {
                    noConnection();
                }
            }); //ajax
        };

        my.projects_Update = function (projectId, DesImpianto, Indirizzo, Latitude, Longitude, AltSLM) {
            var urlBase = $.appParms.urlBase();
            var msg = {
                id: projectId,
                description: DesImpianto,
                address: Indirizzo,
                latitude: Latitude,
                longitude: Longitude,
                altitude: AltSLM
            }
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'projects_Update',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //Projects user
        //========================================================================================
        my.projectsUsers_Del = function (id) {
            var urlBase = $.appParms.urlBase();
            var msg = {
                id: id,
            };
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'projectsUsers_Del',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.projectsUsers_List = function (projectId, userId) {
            var urlBase = $.appParms.urlBase();
            var msg = {
                id: userId
            };
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'projectsUsers_List',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.projectsUsers_Upsert = function (projectId, userId) {
            var urlBase = $.appParms.urlBase();
            var msg = {
                id: projectId,
                userId: userId
            };
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'projectsUsers_Upsert',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        //installations
        //========================================================================================
        my.installations_Add = function (projectId, description, street, latitude, longitude, altitude, note) {
            var urlBase = $.appParms.urlBase();
            var msg = {
                "projectId": projectId,
                "description": description,
                "street": street,
                "latitude": latitude,
                "longitude": longitude,
                "altitude": altitude,
                "note": note
            }
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'installations_Add',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                async: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        my.installations_List = function (id, searchString) {
            var msg = {
                "projectId": id
            }
            var urlBase = $.appParms.urlBase();
            return $.ajax({
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                url: urlBase + 'installations_List',
                data: JSON.stringify(msg),
                type: 'POST',
                cache: false,
                processData: false,
                beforeSend: function () { },
                complete: function () { },
                error: function (xhr, status) {
                    noConnection();
                }
            }); //ajax
        };
        //========================================================================================

        function noConnection() {
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "positionClass": "toast-top-full-width",
                "onclick": null,
                "showDuration": "200",
                "hideDuration": "1000",
                "timeOut": "2000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            toastr["error"](langResources['msg4noconnection'], langResources['alert']);
        }

        return my;
    })({});
})(jQuery)
