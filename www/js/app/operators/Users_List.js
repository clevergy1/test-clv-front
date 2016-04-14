/*
Admin Manage Users - Users List
-----------------------------------------------------------*/
$(function () {

    $(document).ready(function () {
        var $ImpiantoSelect = '';

        $('.tableUsers').footable();
        $('.tableUsers').data('page-size', 20);
        $('.tableUsers').data('limit-navigation', 4);
        $('.tableUsers').trigger('footable_initialized');

        $('.tableRoles').footable();
        $('.tableRoles').data('page-size', 20);
        $('.tableRoles').data('limit-navigation', 4);
        $('.tableRoles').trigger('footable_initialized');

        $('#ApplicationTitle').html('<span name="lbl" caption="users">users</span>');
        //$("#pageOperation").empty();
        //$("#tmplpageOperation").tmpl(null).appendTo("#pageOperation");

        /*
        Init
        ----------------------------------------------------*/
        setlanguage();
        if (localStorage.getItem('CurrentRole')) {
            loadUsers(localStorage.getItem('CurrentRoleId'), localStorage.getItem("CurrentRole"), '', '');
            $('#roleSelected').val(localStorage.getItem('CurrentRole'));
        }
        /*--------------------------------------------------*/

        $('#roleSelected').on('focus', function (e) {
            loadRoles();
            $("#SelectRoleModal").modal('show');
        });

        function loadRoles() {
            $('#RolesList').empty();

            var req = $.DataAccess.roles_List();
            req.success(function (json) {
                if (json.retval == true) {
                    $("#tmplRolesList").tmpl(json.data).appendTo("#RolesList");
                    $('.tableRoles').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $.fn.selRole = function (roleId, roleName) {
            localStorage.setItem("CurrentRole", roleName);
            localStorage.setItem("CurrentRoleId", roleId);
            $('#roleSelected').val(roleName);
            loadUsers(roleId, roleName, $('#searchString').val(), $ImpiantoSelect);
            $("#SelectRoleModal").modal('hide');
        }

        function loadUsers(roleId, roleName, searchString, installationId) {
            $("#manageUsersList").empty();

            //console.log("loadUsers roleId: ", roleId, " searchString:", searchString, "installationId: ", installationId);
            //console.log("$ImpiantoSelect", $ImpiantoSelect);

            var r = $.DataAccess.users_GetUsersByRoleId(roleId, searchString, installationId);
            r.success(function (json) {
                if (json.retval == true) {
                    console.log("users_GetUsersByRoleId",json.data);
                    $("#tmplmanageUsersList").tmpl(json.data).appendTo("#manageUsersList");
                    $('.tableUsers').trigger('footable_redraw');
                    setlanguage();
                    if (roleName == 'Supervisors' || roleName == 'Maintainers') {
                        $('.userDevices').show();
                    }
                    else {
                        $('.userDevices').hide();
                    }
                }
            });
        }

        /*
        searchString
        --------------------------------------------------*/
        $('#searchString').on('keyup', function (e) {
            var filter = $(this).val();
            if (filter.length > 2) {
                loadUsers(localStorage.getItem("CurrentRoleId"), filter, '');
            }
            if (filter.length == 0) {
                loadUsers(localStorage.getItem("CurrentRoleId"), filter, '');
            }
        });

        $('#btnClearsearchString').on('click', function (e) {
            $('#searchString').val('');
            loadUsers(localStorage.getItem("CurrentRoleId"), localStorage.getItem("CurrentRole"), $('#searchString').val(), $ImpiantoSelect);
        });
        /*------------------------------------------------*/

        ///* Impianto*/
        //$('#searchImpianto').on('focus', function (e) {
        //    loadImpianti('');
        //    $("#SelectImpiantoModal").modal('show');
        //});
        //$.fn.selImpianto = function (IdImpianto, DesImpianto) {
        //    $ImpiantoSelect = IdImpianto;
        //    $('#searchImpianto').val(DesImpianto);

        //    loadUsers(localStorage.getItem("CurrentRoleId"), localStorage.getItem("CurrentRole"), $('#searchString').val(), $ImpiantoSelect);
        //    $("#SelectImpiantoModal").modal('hide');
        //}

        //function loadImpianti(searchString) {
        //    $("#ImpiantiList").empty();
        //    var r = $.DataAccess.Impianti_List(searchString);
        //    r.success(function (json) {
        //        var data = json.d;
        //        if (data) {
        //            $("#tmplImpiantiList").tmpl(data).appendTo("#ImpiantiList");
        //            $('.tableImpianti').trigger('footable_redraw');
        //            setlanguage();
        //        }
        //    });
        //}

        //$('#btnClearsearchImpianto').on('click', function (e) {
        //    $ImpiantoSelect = '';
        //    $('#searchImpianto').val('');
        //    loadUsers(localStorage.getItem("CurrentRoleId"), localStorage.getItem("CurrentRole"), $('#searchString').val(), $ImpiantoSelect);
        //});
        /*--------------------------------------------------------------------------*/

        $('#bntCallAddUser').on('click', function (e) {
            $.module.load('operators/Users_Add');
        });

        $.fn.updUser = function (UserName, userId) {
            localStorage.setItem("UserName2Manage", UserName);
            localStorage.setItem("userId2Manage", userId);
            $.module.load('operators/Users_Detail');
        }

        /*
        User Devices
        -------------------------------------------------*/
        $.fn.dev4user = function (UserName, userId) {
            localStorage.setItem("UserName2Manage", UserName);
            localStorage.setItem("userId2Manage", userId);
            $.module.load('operators/Users_Devices.html');
        }
        /*-----------------------------------------------*/

    }); //document ready

});


function selImpianto(IdImpianto, DesImpianto) {
    $.fn.selImpianto(IdImpianto, DesImpianto);
}