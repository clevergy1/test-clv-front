/*
Admin Manage Users - User devices
-----------------------------------------------------------*/
$(function () {

    $(document).ready(function () {
       
        var UserId;
        var assignedDevices = [];


        var admin_currentUserName = '',
            admin_IdImpianto='';
        readDetail();
        setlanguage();

        /*
        user detail
        --------------------------------------------------------------*/
        function readDetail() {
            admin_currentUserName = localStorage.getItem('UserName2Manage');
            var req = $.DataAccess.users_GetUserByUserName(admin_currentUserName);
            req.success(function (json) {
                if (json.retval == true) {
                    var data = json.data[0]
                    UserId = data.userId;
                    $('#userdetailUserName').text(data.userName);
                    $('#userdetailComment').text(data.comment);

                    loadAssignedInstallations();
                    // loadAvailableInstallations();
                } //data
            });
        }
        /*------------------------------------------------------------*/

        /*
        installations 
        -----------------------------------------------------------------*/
        function loadAssignedInstallations() {
            $("#assignedList").empty();
            var req = $.DataAccess.projects_ListByUser(localStorage.getItem('userId2Manage'), '');
            req.success(function (json) {
                if (json.retval == true) {
                    $("#tmplassignedList").tmpl(json.data).appendTo("#assignedList");
                    $("#assignedList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });
                    loadAvailableInstallations();
                }
                else {
                    loadAvailableInstallations();
                }
            });
        }

        function loadAvailableInstallations() {
            $("#availableList").empty();
            var req = $.DataAccess.projects_List('','');
            req.success(function (json) {
                if (json.retval==true) {
                    $("#tmplavailableList").tmpl(json.data).appendTo("#availableList");
                    $("#availableList").niceScroll({
                        cursorcolor: "#1FB5AD",
                        cursorborder: "0px solid #fff",
                        cursorborderradius: "0px",
                        cursorwidth: "3px"
                    });

                    $("#assignedList li").each(function () {
                        var assigned = $(this).text().trim();
                        $("#availableList li").each(function () {
                            if ($(this).text().search(new RegExp(assigned, "i")) < 0) {
                                //console.log('trovato : ' + assigned);
                                //$(this).fadeOut();
                            } else {
                                //$(this).show();
                                $(this).fadeOut();
                            }
                        });
                    });
                }
            });
        }

        $.fn.seleAvail = function (id) {
            var req = $.DataAccess.projectsUsers_Upsert(id, localStorage.getItem("userId2Manage"));
            req.success(function (json) {
                loadAssignedInstallations();
            });
        }

        $.fn.selassigned = function (_id) {
            var req = $.DataAccess.projectsUsers_Del(_id);
            req.success(function (json) {
                loadAssignedInstallations();
            });
        }
        /*---------------------------------------------------------------*/

    }); //document ready

});

