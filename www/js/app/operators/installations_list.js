
$(function () {

    $(document).ready(function () {

        /*
        fixed header table
        ---------------------------------------------------------------*/
        $('#mainTable').floatThead({
            scrollContainer: function ($table) {
                return $table.closest('.panel-body');
            }
        });
        /*-------------------------------------------------------------*/

        $('#ApplicationTitle').html('<span name="lbl" caption="currentinstallations">currentinstallations</span>');
        $("#pageOperation").empty();

        //tmplNavigationbar
        $('#usermenu').empty();
        //$("#tmplNavigationbar").tmpl([{ foo: "" }]).appendTo("#usermenu");
        setlanguage();

        /*
        projects
        -------------------------------------------------------------------------------*/
        function readProject() {
            var req = $.DataAccess.projects_Read(localStorage.getItem("clv-projectId"));
            req.success(function (json) {                
                if (json.retval === true) {
                    var data = json.data[0]
                    $("#DesImpianto").text(data.description);
                }
            });
        }
        /*-----------------------------------------------------------------------------*/

        /*
        installations
        -------------------------------------------------------------------------------*/
        function loadinstallations() {
            $("#installationsList").empty();
            var r = $.DataAccess.installations_List(localStorage.getItem("clv-projectId"));
            r.success(function (json) {
                console.log("installations_List", json);
                if (json.retval === true) {
                    
                    $("#tmplinstallationsList").tmpl(json.data).appendTo("#installationsList");
                    setlanguage();
                    //loadTotDoc(data);
                    //loadTotTickets(data);
                }
            });
        }

        $('#btnCallAdd').on('click', function (e) {
            $.module.load('operators/installations_add');
        });
        /*-----------------------------------------------------------------------------*/

        readProject();
        loadinstallations();


    }); //document ready

});