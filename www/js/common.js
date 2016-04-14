﻿$(function () {
    "use strict";


    $(document).ready(function () {

        $.fn.userLogOut = function () {
            localStorage.removeItem('OperatorName');

            localStorage.removeItem('keyA');
            localStorage.removeItem("admin-remember");

            localStorage.removeItem('keyO');
            localStorage.removeItem("operator-remember");

            localStorage.removeItem('keyS');
            localStorage.removeItem("supervisor-remember");

            $.router.navigate('index/main.html');
        }

        $.fn.supervisorSettings = function () {
            $.module.load('Impianti/Supervisors/resetPassword');
        }

    }); //document ready

});


function stringToBoolean(string) {
    switch (string.toLowerCase()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}

function init() {
    //console.log("init");
    //set numeric fields properties


    /*==Slim Scroll ==*/
    if ($.fn.slimScroll) {
        $('.event-list').slimscroll({
            height: '305px',
            wheelStep: 20
        });
        $('.conversation-list').slimscroll({
            height: '360px',
            wheelStep: 35
        });
        $('.to-do-list').slimscroll({
            height: '300px',
            wheelStep: 35
        });
    }
    /*==Nice Scroll ==*/
    if ($.fn.niceScroll) {
        $(".leftside-navigation").niceScroll({
            cursorcolor: "#1FB5AD",
            cursorborder: "0px solid #fff",
            cursorborderradius: "0px",
            cursorwidth: "3px"
        });

        $(".leftside-navigation").getNiceScroll().resize();
        if ($('#sidebar').hasClass('hide-left-bar')) {
            $(".leftside-navigation").getNiceScroll().hide();
        }
        $(".leftside-navigation").getNiceScroll().show();

        $(".right-stat-bar").niceScroll({
            cursorcolor: "#1FB5AD",
            cursorborder: "0px solid #fff",
            cursorborderradius: "0px",
            cursorwidth: "3px"
        });
    }

    /*==Collapsible==*/
    $('.widget-head').click(function (e) {
        var widgetElem = $(this).children('.widget-collapse').children('i');

        $(this)
            .next('.widget-container')
            .slideToggle('slow');
        if ($(widgetElem).hasClass('ico-minus')) {
            $(widgetElem).removeClass('ico-minus');
            $(widgetElem).addClass('ico-plus');
        } else {
            $(widgetElem).removeClass('ico-plus');
            $(widgetElem).addClass('ico-minus');
        }
        e.preventDefault();
    });
    

    // tool tips

    $('.tooltips').tooltip();

    // popovers

    $('.popovers').popover();


    if (localStorage.getItem("OperatorName")) {
        $('.username').text(localStorage.getItem("OperatorName"));
    }
    if (localStorage.getItem("AdminName")) {
        $('.username').text(localStorage.getItem("AdminName"));
    }
    if (localStorage.getItem("SupervisorName")) {
        $('.username').text(localStorage.getItem("SupervisorName"));
    }
  
    /*==Sidebar Toggle==*/
    $(".leftside-navigation .sub-menu > a").click(function () {
        var o = ($(this).offset());
        var diff = 80 - o.top;
        if (diff > 0)
            $(".leftside-navigation").scrollTo("-=" + Math.abs(diff), 500);
        else
            $(".leftside-navigation").scrollTo("+=" + Math.abs(diff), 500);
    });

    $('.sidebar-toggle-box .fa-bars').click(function (e) {

        $(".leftside-navigation").niceScroll({
            cursorcolor: "#1FB5AD",
            cursorborder: "0px solid #fff",
            cursorborderradius: "0px",
            cursorwidth: "3px"
        });

        $('#sidebar').toggleClass('hide-left-bar');
        if ($('#sidebar').hasClass('hide-left-bar')) {
            $(".leftside-navigation").getNiceScroll().hide();
        }
        $(".leftside-navigation").getNiceScroll().show();
        $('#main-content').toggleClass('merge-left');
        e.stopPropagation();
        if ($('#container').hasClass('open-right-panel')) {
            $('#container').removeClass('open-right-panel')
        }
        if ($('.right-sidebar').hasClass('open-right-bar')) {
            $('.right-sidebar').removeClass('open-right-bar')
        }

        if ($('.header').hasClass('merge-header')) {
            $('.header').removeClass('merge-header')
        }
    });
    $('.toggle-right-box .fa-bars').click(function (e) {
        $('#container').toggleClass('open-right-panel');
        $('.right-sidebar').toggleClass('open-right-bar');
        $('.header').toggleClass('merge-header');

        e.stopPropagation();
    });

    $('.header,#main-content,#sidebar').click(function () {
        if ($('#container').hasClass('open-right-panel')) {
            $('#container').removeClass('open-right-panel')
        }
        if ($('.right-sidebar').hasClass('open-right-bar')) {
            $('.right-sidebar').removeClass('open-right-bar')
        }

        if ($('.header').hasClass('merge-header')) {
            $('.header').removeClass('merge-header')
        }
    });
    /*==Sidebar Toggle==*/

    //$('.panel .tools .fa').click(function () {
    //    var el = $(this).parents(".panel").children(".panel-body");
    //    if ($(this).hasClass("fa-chevron-down")) {
    //        $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
    //        el.slideUp(200);
    //    } else {
    //        if ($(this).hasClass("fa-chevron-up")) {
    //            $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
    //            el.slideDown(200);
    //        }
    //    }
    //});

        //$('.panel .tools .fa-times').click(function () {
        //    $(this).parents(".panel").parent().remove();
    //});




} //init

function initcollapsepanel(){
    $('.panel .tools .fa').click(function () {
        var el = $(this).parents(".panel").children(".panel-body");
        if ($(this).hasClass("fa-chevron-down")) {
            $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideUp(200);
        } else {
            if ($(this).hasClass("fa-chevron-up")) {
                $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
                el.slideDown(200);
            }
        }
    });
}



function setlanguage() {
    $("span[name='lbl']").each(function (i, elt) {
        try {
            $(elt).text(langResources[$(elt).attr("caption")]);
            if ($(elt).parent().attr('for')) {
                var xxx = $(elt).parent().attr('for');
                $('#' + xxx).attr('placeholder', $(elt).text());
                //console.log(xxx);
            }

        }
        catch (err) {
            console.log(err);
        }        
    });

    //moment.locale(localStorage.getItem("CurrentLanguage"));
}

var langResources = new Array();
function ImpostLang() {
    //moment.locale("it");
    if (!localStorage.getItem('CurrentLanguage')) {
        localStorage.setItem("CurrentLanguage", "en");
        langResources = $.languages.get()["en"];
        //moment.locale("en");
    }
    else {
        langResources = $.languages.get()[localStorage.getItem("CurrentLanguage")];
        //moment.locale(localStorage.getItem("CurrentLanguage"));
    }

    setlanguage();
}

function userLogOut() {
    $.fn.userLogOut();
}
function supervisorSettings() {
    $.fn.supervisorSettings();
}