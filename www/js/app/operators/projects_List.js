/*
Impianti Operators List
------------------------------------------*/
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

        $.rt.stop();

        //$('#usermenu').empty();
        //var voicesMenu = [];
        //voicesMenu.push({ Name: "system id", page: "RemoteSystemList", tot: 1, stato: 0 });
        //$("#tmplMenuDetail").tmpl(voicesMenu).appendTo("#usermenu");
        //setlanguage();

        $('#ApplicationTitle').html('<span name="lbl" caption="currentprojects">currentprojects</span>');
        $("#pageOperation").empty();
        $("#tmplpageOperation").tmpl(null).appendTo("#pageOperation");

        /*
        Tabella impianti
        -------------------------------------------------------------*/

        load('');

        $('#btnCallAdd').on('click', function () {
            $.module.load('operators/projects_Add');
        });

        $.fn.sel = function (id) {
            localStorage.setItem("clv-projectId", id);
            //loadNavigationBar();
            //$.rt.load();
            $.module.load('operators/installations_list');
        }

        $.fn.edit = function (id) {
            localStorage.setItem("clv-projectId", id);
            //loadNavigationBar();
            //$.rt.load();
            $.module.load('operators/projects_Update');
        }

        function load(searchString) {
            //console.log("loadImpianti");
            $("#ListImpianti").empty();
            var r = $.DataAccess.projects_List("", searchString);
            r.success(function (json) {
                console.log("projects_List", json.dataObject);
                if (json.retval===true) {
                    $("#tmplImpiantiList").tmpl(json.dataObject).appendTo("#ListImpianti");
                    $('table').trigger('footable_redraw');
                    setlanguage();
                }
            });
        }

        $('#siteSearch').on('keyup', function (e) {
            var filter = $(this).val();
            if (filter.length > 2) {
                load(filter);
            }
            if (filter.length == 0) {
                load('');
            }
        });

    }); //document ready




});
