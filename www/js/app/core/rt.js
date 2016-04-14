(function ($) {

    $.rt = (function (my) {
        var signalRscript, signalRHub, aliveVal;
        var urlHub, clientsHub;
        var $hubState;
        var stateConversion = { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' };

        my.load = function () {
            //console.log('rt.load');
            if (signalRscript) {
                try {
                    (document.getElementsByTagName('body')[0]).removeChild(signalRscript);
                }
                catch (err) {
                    console.log(err);
                }
            }

            if (signalRHub) {
                try {
                    (document.getElementsByTagName('body')[0]).removeChild(signalRHub);
                }
                catch (err) {
                    console.log(err);
                }
            }

            signalRscript = document.createElement('script');
            signalRscript.type = 'text/javascript';
            signalRscript.async = false;
            signalRscript.src = 'js/signalR/jquery.signalR-2.1.0.min.js';
            (document.getElementsByTagName('body')[0]).appendChild(signalRscript);

            signalRHub = document.createElement('script');
            signalRHub.type = 'text/javascript';
            signalRHub.async = false;
            signalRHub.src = $.appParms.urlHub();
            (document.getElementsByTagName('body')[0]).appendChild(signalRHub);

        };

        my.start = function () {
            //console.log('rt.start');
            //========================================================
            urlHub = $.appParms.urlHub();
            $.connection.hub.url = urlHub;
            $.connection.hub.logging = false;
            clientsHub = $.connection.clientsHub;

            /*
            Parking system receive messages
            ------------------------------------------------------------------------------*/
            clientsHub.client.received_NodeIdAdd = function (NodeId) {
                console.log("received_NodeIdAdd NodeId= " + NodeId);
                try {
                    $.fn.received_NodeIdAdd(NodeId);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_NodeIdUpd = function (NodeId) {
                console.log("received_NodeIdUpd NodeId= " + NodeId);
                try {
                    $.fn.received_NodeIdUpd(NodeId);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_StakeoutAreaUpd = function (NodeId) {
                console.log("received_StakeoutAreaUpd NodeId= " + NodeId);
                try {
                    $.fn.received_StakeoutAreaUpd(NodeId);
                }
                catch (err) {
                    ;
                }
            }
            /*----------------------------------------------------------------------------*/

            /*
            HeatingSytem receive messages
            ------------------------------------------------------------------------------*/
            clientsHub.client.received_hs_TemperatureProbes_setValue = function (hsId, ProbeCod, currentValue) {                
                try {
                    $.fn.received_hs_TemperatureProbes_setValue(hsId, ProbeCod, currentValue);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_cal_setStatus = function (hsId, CalCod, SetPoint, isRunning, stato) {
                try {
                    $.fn.received_hs_cal_setStatus(hsId, CalCod, SetPoint, isRunning, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Cir_setStatus = function (hsId, CirCod, isRunning, stato) {
                try {
                    $.fn.received_hs_Cir_setStatus(hsId, CirCod, isRunning, stato);
                }
                catch (err) {
                    ;
                }           
            }
            clientsHub.client.received_hs_Cir_setManualMode = function (hsId, CirCod, ManualMode) {
                try {
                    $.fn.received_hs_Cir_setManualMode(hsId, CirCod, ManualMode);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Cron_setStatus = function (hsId, CronCod, SetPoint, stato) {
                try {
                    $.fn.received_hs_Cron_setStatus(hsId, CronCod, SetPoint, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Vrd_setStatus = function (hsId, VrdCod, SetPoint, stato) {
                try {
                    $.fn.received_hs_Vrd_setStatus(hsId, VrdCod, SetPoint, stato);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Ctl_setValue = function (hsId, CtlCod,stato, currentValue) {
                try {
                    $.fn.received_hs_Ctl_setValue(hsId, CtlCod,stato, currentValue);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Ctb_setValue = function (hsId, CtbCod, currentValue) {
                try {
                    $.fn.received_hs_Ctb_setValue(hsId, CtbCod, currentValue);
                }
                catch (err) {
                    ;
                }
            }
            clientsHub.client.received_hs_Doors_setValue = function (hsId, DoorCod, currentValue) {
                try {
                    $.fn.received_hs_Doors_setValue(hsId, DoorCod, currentValue);
                }
                catch (err) {
                    ;
                }
            }
            /*----------------------------------------------------------------------------*/

            /*connection manager*/
            $.connection.hub.stateChanged(connectionStateChanged);
            $.connection.hub.start()
            .done(function () {
                console.log('Now connected, connection ID=' + $.connection.hub.id + ' IdImpianto=' + localStorage.getItem('IdImpianto'));
                clientsHub.server.subscribe(localStorage.getItem('IdImpianto'));
            })
            .fail(function () {
                console.log('Could not Connect!');
                toastr["warning"](langResources['serverlost'], langResources['alert']);
            });

            function connectionStateChanged(state) {
                console.log('SignalR state changed from: ' + stateConversion[state.oldState] + ' to: ' + stateConversion[state.newState]);

                $hubState = state.newState;

                if (stateConversion[state.newState] == 'connected') { connectionStatus(true); }
                if (stateConversion[state.newState] == 'disconnected') { connectionStatus(false); }
                if (stateConversion[state.newState] == 'reconnecting') { connectionStatus(false); }

                if (stateConversion[state.newState] == 'disconnected' && stateConversion[state.oldState] == 'connected') {
                    ;
                }
                if (stateConversion[state.newState] == 'connected' && stateConversion[state.oldState] == 'disconnected') {
                    ;
                }
            } //connectionStateChanged

            function connectionStatus(status) {
                var data = [{ status: status }];
                console.log('connectionStatus= ' + status);
                $('#navbar-signalR').empty();
                try {
                    $("#tmplnavbar-signalR").tmpl(data).appendTo("#navbar-signalR");
                }
                catch (err) {
                    // console.log(err);
                }
            }

            $.fn.unsubscribe = function () {
                try {
                    clientsHub.server.unsubscribe(localStorage.getItem('IdImpianto'));
                }
                catch (err) {
                    //console.log(err);
                }
                $.connection.hub.stop();
                console.log('connection stop');
            }

            /*send messages*/


            //========================================================
        }; // start

        my.stop = function () {
            try {
                //unsubscribe();
                clientsHub.server.unsubscribe(localStorage.getItem('IdImpianto'));
                $.connection.hub.stop();
                console.log('connection stop');
            }
            catch (err) {
                console.log(err);
            }
        };

        return my;
    })({});

})(jQuery);