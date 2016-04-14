$(function () {
    var langResources = [];
    //global functions
    //===========================================
    $(".make-switch input").bootstrapSwitch();

    $(document).ready(function () {
        $('#Operator-login').hide();
        $('#Supervisor-login').hide();

        //clearStorage();

        if (!localStorage.getItem('clv-CurrentLanguage')) {
            localStorage.setItem("clv-CurrentLanguage", "en");
            langResources = $.languages.get()["en"];
        }
        else {
            langResources = $.languages.get()[localStorage.getItem("clv-CurrentLanguage")];
        }

        setlanguage();
    });

    function clearStorage() {
        var CurrentLanguage='';
        if (localStorage.getItem('clv-CurrentLanguage')) {
            CurrentLanguage = localStorage.getItem('clv-CurrentLanguage');
        }

        localStorage.removeItem('clv-keyO');
        localStorage.removeItem("operator-remember");

        localStorage.removeItem('clv-keyS');
        localStorage.removeItem("supervisor-remember");

        localStorage.clear();

        if (CurrentLanguage != '') {
            localStorage.setItem('clv-CurrentLanguage', CurrentLanguage);
        }
    }

    //lang
    //==========================================
    //langEn
    $('#langEn').on('click', function (e) {
        localStorage.setItem("clv-CurrentLanguage", "en");
        //langResources = getLanguageResources()["en"];
        langResources = $.languages.get()["en"];
        setlanguage();
    });

    //langIt
    $('#langIt').on('click', function (e) {
        window.localStorage.setItem("clv-CurrentLanguage", "it");
        //langResources = getLanguageResources()["it"];
        langResources = $.languages.get()["it"];
        setlanguage();
    });
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
    }
    //==========================================



    //operator login
    //===========================================
    $('#btnOperator').bind('click', function (e) {
        clearStorage();
        $('#Operator-login').show();
        $('#Supervisor-login').hide();
    });

    $('#operatorlogin').bind('click', function (e) {
        OperatorLogin(e);
    });

    function OperatorLogin(e) {
        e.preventDefault();
        e.stopPropagation();
        var username = $('#operator-login-username').val().trim(),
            password = $('#operator-login-password').val().trim();

        if (username === "" || password === "") {
            alert("Both fields are required!",
                                            function () { },
                                            "Login failed",
                                            'OK');
        } else {
            var req = $.DataAccess.users_logO(username, password);
            req.success(function (json) {
                console.log("OperatorLogin", json);
                if (json.retval === true) {
                    localStorage.setItem("clv-OperatorName", username);
                    localStorage.setItem("clv-keyO", json.data);
                    if ($('#operator-index-remember').bootstrapSwitch('state') === true) {
                        localStorage.setItem("clv-operator-remember", true);
                    }

                    $('#operator-login-username').val('');
                    $('#operator-login-password').val('');
                    $.router.navigate('operators/main.html');

                }
                else {
                    alert("Invalid user or password",
                                                    function () { },
                                                    "Login failed",
                                                    'OK');
                }
            });

        }
    }
    //===========================================

    //Supervisor login
    //===========================================
    $('#btnSupervisor').bind('click', function (e) {
        clearStorage();
        $('#Operator-login').hide();
        $('#Supervisor-login').show();
    });

    $('#supervisorlogin').bind('click', function (e) {
        SupervisorLogin(e);
    });

    function SupervisorLogin(e) {
        e.preventDefault();
        e.stopPropagation();
        var username = $('#supervisor-login-username').val().trim(),
            password = $('#supervisor-login-password').val().trim();

        if (username === "" || password === "") {
            alert("Both fields are required!",
                                            function () { },
                                            "Login failed",
                                            'OK');
        } else {
            var req = $.DataAccess.users_logS(username, password);
            req.success(function (json) {
                if (json.retval === true) {
                    localStorage.setItem("clv-SupervisorName", username);
                    localStorage.setItem("clv-keyS", json.data);
                    if ($('#supervisor-index-remember').bootstrapSwitch('state') == true) {
                        localStorage.setItem("clv-supervisor-remember", true);
                    }

                    $('#supervisor-login-username').val('');
                    $('#supervisor-login-password').val('');
                    $.router.navigate('supervisors/main.html');

                }
                else {
                    alert("Invalid user or password",
                                                    function () { },
                                                    "Login failed",
                                                    'OK');
                }
            });

        }
    }
    //===========================================
});
