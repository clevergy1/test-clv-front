/*
Admin Manage Users - User detail
-----------------------------------------------------------*/
$(function () {
    $(document).ready(function () {
        var userDetailLoaded = false;
        var $currentUserP = '';
        var admin_currentUserName = '';
        var UserId;

        $('.tableImpianti').footable();
        $('.tableImpianti').data('page-size', 20);
        $('.tableImpianti').data('limit-navigation', 4);
        $('.tableImpianti').trigger('footable_initialized');

        $('.tableUserImpianti').footable();
        $('.tableUserImpianti').data('page-size', 20);
        $('.tableUserImpianti').data('limit-navigation', 4); 
        $('.tableUserImpianti').trigger('footable_initialized');

        readDetail();

        function readDetail() {
            admin_currentUserName = localStorage.getItem('UserName2Manage');            
            var req = $.DataAccess.users_GetUserByUserName(admin_currentUserName);
            req.success(function (json) {
                console.log("json.data.userName", json.data[0].userName);
                if (json.retval==true) {
                    UserId = json.data[0].userId;
                    $('#UserNameToDelete').text(json.data[0].userName);
                    $('#userdetailUserName').text(json.data[0].userName);
                    $('#userdetailEmail').text(json.data[0].email);
                    //$currentUserP = json.data.Password;
                    $('#userdetailComment').text(json.data[0].comment);
                    $('#userdetailCreateDate').text(moment(json.data[0].CreateDate).format('DD/MM/YYYY HH:mm'));
                    //$('#userdetailLastLogin').text(moment(data.LastLoginDate).format('DD/MM/YYYY HH:mm'));                    

                    $('#userUpdEmailAdmin').val(json.data[0].email);
                    $('#userUpdCommentAdmin').val(json.data[0].comment);
                    $('#userdetailIsLockedOut').bootstrapSwitch('state', json.data[0].isLockedOut, json.data[0].isLockedOut);
                    //$('#userdetailIsApproved').bootstrapSwitch('state', data.IsApproved, data.IsApproved);

                    $('#totImpianti').text(json.data[0].totImpianti);



                    userDetailLoaded = true;
                } //data
            });
            $('#userdetailIsLockedOutresult').removeClass("operationOk");
            $('#userdetailIsLockedOutresult').removeClass("operationNok");
            $('#userdetailIsApprovedresult').removeClass("operationOk");
            $('#userdetailIsApprovedresult').removeClass("operationNok");
        }

        /*user impianti*/
        $('#ImpiantoSelected').on('focus', function (e) {
            console.log('ImpiantoSelected focus');
            loadImpianti('');
            $("#SelectImpiantoModal").modal('show');
        });
        $.fn.selImpianto = function (IdImpianto, DesImpianto) {           
            $('#ImpiantoSelected').val(DesImpianto);

            var r = $.DataAccess.Impianti_Users_Read(IdImpianto, UserId);
            r.success(function (json) {
                var r = json.d;
                if (r) {
                    console.log('lettura andata a buon fine');
                   
                }
                else {
                    var req = $.DataAccess.installationsUsers_Upsert(IdImpianto, UserId, false);
                    req.success(function (json) {
                        var data = json.d;
                        if (data == true) {
                            loadUserImpianti();                            
                        }
                        else {
                            toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                        }
                    });
                }
            });
            $("#SelectImpiantoModal").modal('hide');
        }

        function loadImpianti(searchString) {
            $("#ImpiantiList").empty();
            var r = $.DataAccess.Impianti_List(searchString);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmplImpiantiList").tmpl(data).appendTo("#ImpiantiList");
                    $('.tableImpianti').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        function loadUserImpianti() {
            $("#UserImpiantiList").empty();
            var r = $.DataAccess.Impianti_Users_List(UserId);
            r.success(function (json) {
                var data = json.d;
                if (data) {
                    $("#tmpltableUserImpianti").tmpl(data).appendTo("#UserImpiantiList");
                    $('.tableImpianti').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }
        /*------------------------------------------------------------------------*/

        //userdetailIsLockedOut change monitor
        $('#userdetailIsLockedOut').on('switchChange.bootstrapSwitch', function (event, state) {           
            if (userDetailLoaded == true) {
                if (state == true) {
                    lockUser();
                }
                else {
                    unlockUser();
                }
            }
        });
        function lockUser() {
            var req = $.DataAccess.users_lockUser(localStorage.getItem('userId2Manage'));
            req.success(function (json) {
                if (json.retval == true) {
                    //d="userdetailIsLockedOutresult" class=" operationOk "
                    $('#userdetailIsLockedOutresult').addClass("operationOk");
                }
                else {
                    $('#userdetailIsLockedOutresult').addClass("operationNok");
                }
            });
        }
        function unlockUser() {
            var req = $.DataAccess.users_UnlockUser(localStorage.getItem('userId2Manage'));
            req.success(function (json) {
                if (json.retval == true) {
                    //d="userdetailIsLockedOutresult" class=" operationOk "
                    $('#userdetailIsLockedOutresult').addClass("operationOk");
                }
                else {
                    $('#userdetailIsLockedOutresult').addClass("operationNok");
                }
            });
        }

 
        //delete user
        //==============================================================
        //data-toggle="modal" data-target="#DeleteUserModal"

        $('#btnCallDeleteUser').on('click', function (e) {
            $("#DeleteUserModal").modal('show');
        });

        $('#btnDeleteUser').on('click', function (e) {
            $('body').removeClass('modal-open');
            $("#DeleteUserModal").modal('hide');

            setTimeout(function () {
                console.log('timeout');
                var req = $.DataAccess.users_removeUser(localStorage.getItem('userId2Manage'));
                req.success(function (json) {
                    if (json.retval === true) {
                        $.module.load('operators/Users_List');
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }, 300);

        });
        //==============================================================

        //call update user
        //==============================================================
        $('#btnCallUpdateUser').on('click', function (e) {
            $.module.load('operators/Users_Update');
        });
        //==============================================================

        //reset user password
        //==============================================================
        $('#btnCallResetUserPassword').on('click', function (e) {
            $('#rowuserDetail').hide();
            $('#resetNewPassword').val('');
            $('#resetNewPassword2').val('');
            $('#rowresetpassword').show();
        });

        $('.wcloserowresetpassword').on('click', function (e) {
            $('#rowuserDetail').show();
            $('#rowresetpassword').hide();
        });

        $('#btnResetPassword').on('click', function (e) {
            var error_present = false;
            var Password = $('#resetNewPassword').val().trim(),
                Password1 = $('#resetNewPassword2').val().trim();

            if (!error_present) {
                if (Password == '') {
                    error_present = true;
                    toastr["warning"](langResources['msg4emptypassword'], langResources['alert']);
                }
            }

            if (!error_present) {
                if (Password != Password1) {
                    error_present = true;
                    toastr["warning"](langResources['msg4unmatchpasswords'], langResources['alert']);
                }
            }

            if (!error_present) {
                var req = $.DataAccess.users_AdminchangeUserPass(localStorage.getItem('userId2Manage'), Password);
                req.success(function (json) {                    
                    if (json.retval == true) {
                        //$currentUserP = Password;
                        $('#rowuserDetail').show();
                        $('#rowresetpassword').hide();
                    }
                    else {
                        toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                    }
                });
            }
        });
        //==============================================================

    }); //document ready
});