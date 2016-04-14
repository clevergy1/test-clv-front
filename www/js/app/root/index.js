
$(function () {

    $(document).ready(function () {

        if ($.QueryString['clv-projectId']) {
            var operatorremember = localStorage.getItem('operator-remember');
            localStorage.clear();
            localStorage.setItem("clv-projectId", $.QueryString['clv-projectId']);
            if ($.QueryString['clv-keyO']) {
                localStorage.setItem("clv-keyO", $.QueryString['clv-keyO']);
                localStorage.setItem("clv-operator-remember", operatorremember);
            }
            if ($.QueryString['clv-keyS']) {
                localStorage.setItem("clv-keyS", $.QueryString['clv-keyS']);
                localStorage.setItem("clv-supervisor-remember", operatorremember);
            }
            localStorage.setItem("clv-CurrentLanguage", $.QueryString['clv-CurrentLanguage']);
            $(location).attr('href', 'Index.html');
        }


        if (localStorage.getItem('clv-keyO')) {
            console.log('clv-keyO presente');
            var r = $.DataAccess.users_getUserO(localStorage.getItem('clv-keyO'));
            r.success(function (json) {
                if (json.retval===true) {
                    localStorage.setItem("clv-OperatorName", json.dataObject);
                    $.router.navigate('operators/main.html');
                }
                else {
                    localStorage.removeItem("clv-keyO");
                    $.router.navigate('login.html');
                }
            });
        }
        else {
            if (localStorage.getItem('clv-keyS')) {
                console.log('clv-keyS presente');
                var r = $.DataAccess.users_getUserS(localStorage.getItem('clv-keyS'));
                r.success(function (json) {
                    if (json.retval===true) {
                        localStorage.setItem("clv-SupervisorName", json.dataObject);
                        $.router.navigate('supervisors/main.html');
                    }
                    else {
                        localStorage.removeItem("clv-keyS");
                        $.router.navigate('login.html');
                    }
                });
            }
            else {
                localStorage.removeItem("clv-keyS");
                $.router.navigate('login.html');
            } ;
        }




       // if (!localStorage.getItem("clv-keyS") && !localStorage.getItem("clv-keyO")) { $.router.navigate('login.html'); }


    }); //document ready

});
