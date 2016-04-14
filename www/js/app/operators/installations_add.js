
$(function () {

    $(document).ready(function () {
        $('#Descr_Add').val('');
        $('#Indirizzo_Add').val('');
        $('#Latitude_Add').val('');
        $('#Longitude_Add').val('');
        $('#AltSLM_Add').val('');

        /*
        ckeditor
        -------------------------------------------------------------------------------*/
        if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
            CKEDITOR.tools.enableHtml5Elements(document);

        // The trick to keep the editor in the sample quite small
        // unless user specified own height.
        CKEDITOR.config.height = 150;
        CKEDITOR.config.width = 'auto';

        var initSample = (function () {
            var wysiwygareaAvailable = isWysiwygareaAvailable(),
                isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

            return function () {
                var editorElement = CKEDITOR.document.getById('Note_Add');

                // :(((
                if (isBBCodeBuiltIn) {
                    editorElement.setHtml(
                        'Hello world!\n\n' +
                        'I\'m an instance of [url=http://ckeditor.com]CKEditor[/url].'
                    );
                }

                // Depending on the wysiwygare plugin availability initialize classic or inline editor.
                if (wysiwygareaAvailable) {
                    CKEDITOR.replace('Note_Add');
                } else {
                    editorElement.setAttribute('contenteditable', 'true');
                    CKEDITOR.inline('Note_Add');

                    // TODO we can consider displaying some info box that
                    // without wysiwygarea the classic editor may not work.
                }
            };

            function isWysiwygareaAvailable() {
                // If in development mode, then the wysiwygarea must be available.
                // Split REV into two strings so builder does not replace it :D.
                if (CKEDITOR.revision == ('%RE' + 'V%')) {
                    return true;
                }

                return !!CKEDITOR.plugins.get('wysiwygarea');
            }
        })();
        /*-----------------------------------------------------------------------------*/

        /*
        projects
        -------------------------------------------------------------------------------*/
        function readProject() {
            var req = $.DataAccess.projects_Read(localStorage.getItem("clv-projectId"));
            req.success(function (json) {
                if (json.retval === true) {
                    var data = json.dataObject[0]
                    $("#DesImpianto").text(data.description);
                }
            });
        }
        /*-----------------------------------------------------------------------------*/

        /*
        installations
        -------------------------------------------------------------------------------*/
        $('#btnSearchOnMap_Add').on('click', function (e) {
            Latitude = 0;
            Longitude = 0;
            loadmap();
            resetMap();
            var address = $('#Indirizzo_Add').val().trim();
            geocode({ 'address': address });
        });

        $('#btnSetAddress').on('click', function (e) {
            //$('#Indirizzo_Add').val(AddressOnMap);
            //$('#AltSLM_Add').val(elevation);
            //$('#Indirizzo_Upd').val(AddressOnMap);
            //$('#AltSLM_Upd').val(elevation);

            var address = $('#Indirizzo_Add').val().trim();
            if (address == '') {
                address = $('#Indirizzo_Upd').val().trim();
            }
            geocode({ 'address': address });

            $('#Latitude_Add').val(Latitude);
            $('#Longitude_Add').val(Longitude);
            $('#Latitude_Upd').val(Latitude);
            $('#Longitude_Upd').val(Longitude);
        });

        function loadmap() {
            //google maps
            $('#googlemap').height(600);
            map = new google.maps.Map(document.getElementById('googlemap'), {
                zoom: 15,
                zoomControl: false,
                streetViewControl: false,
                center: new google.maps.LatLng(Latitude, Longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            elevator = new google.maps.ElevationService();

            geocoder = new google.maps.Geocoder();
            infowindow = new google.maps.InfoWindow({
                'size': new google.maps.Size(292, 120)
            });

            var address = $('#Indirizzo_Add').val().trim();
            if (address == '') {
                address = $('#Indirizzo_Upd').val().trim();
            }

            if (Latitude != 0 && Longitude != 0) {
                var latlng = new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude));
                marker = new google.maps.Marker({
                    position: latlng,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    map: map,
                    draggable: true,
                    zIndex: google.maps.Marker.MAX_ZINDEX + 1
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(setInfowindowContent(address, Latitude, Longitude));
                    infowindow.open(map, this);
                    setlanguage();
                });
                google.maps.event.addListener(marker, 'dragstart', function (event) {
                    Latitude = this.getPosition().lat();
                    Longitude = this.getPosition().lng();
                    console.log('dragstart lat=' + Latitude + ' lng=' + Longitude + ' latlng=' + latlng + ' this.getPosition()=' + this.getPosition());
                    infowindow.setContent(setInfowindowContent(address, Latitude, Longitude));
                    infowindow.open(map, this);
                    setlanguage();
                });
                google.maps.event.addListener(marker, 'dragend', function (event) {
                    Latitude = this.getPosition().lat();
                    Longitude = this.getPosition().lng();
                    var latlng = this.getPosition();
                    console.log('dragend t lat=' + Latitude + ' lng=' + Longitude + ' latlng=' + latlng + ' this.getPosition()=' + this.getPosition());
                    infowindow.setContent(setInfowindowContent(address, Latitude, Longitude));
                    infowindow.open(map, this);
                    setlanguage();
                });
            }

        }

        $('#btnAdd').on('click', function (e) {
            var projectId = localStorage.getItem("clv-projectId"),
                description = $('#Descr_Add').val(),
                street = $('#Indirizzo_Add').val(),
                latitude = Latitude,
                longitude = Longitude,
                altitude = $('#AltSLM_Add').val(),
                note = CKEDITOR.instances['Note_Add'].getData();
            var req = $.DataAccess.installations_Add(localStorage.getItem("IdImpianto"),
                                                $('#Descr_Add').val(),
                                                $('#Indirizzo_Add').val(),
                                                Latitude,
                                                Longitude,
                                                $('#AltSLM_Add').val(),
                                                localStorage.getItem("OperatorName"));
            req.success(function (json) {
                if (json.retval === true) {
                    $.module.load('operators/installations_list');
                }
                else {
                    toastr["warning"](langResources['msg4operationfailed'], langResources['alert']);
                }
            });
        });
        /*-----------------------------------------------------------------------------*/

        /*
        init
        -------------------------------------------------------------------------------*/
        initSample();
        readProject();
        /*-----------------------------------------------------------------------------*/


        //google maps
        //======================================================
        var map;
        var elevator;
        var elevation = 0;
        var AddressOnMap = null;
        var Latitude = 0;
        var Longitude = 0;
        var geocoder = null;
        var shadow = null;
        var clickIcon = null;
        var clickMarker = null;
        var markers = null;
        var infowindow = null;
        var btnSaveLL = '<a href="#" class="ui-button ui-button-text-icon-primary ui-widget ui-state-default ui-corner-all" title="salva" onclick="saveLL();">' +
                        '<span class="ui-button-icon-primary ui-icon ui-icon-disk"></span>' +
                        '<span class="ui-button-text">Salva</span>' +
                        '</a>';
        var MAPFILES_URL = "http://maps.gstatic.com/intl/en_us/mapfiles/";

        function geocode(request) {
            console.log('geocode', request);
            geocoder.geocode(request, searchResults);

        }
        function searchResults(results, status) {
            console.log('searchResults : ' + results + ' status: ' + status);
            console.log('latitude : ' + results[0].geometry.location.lat() + '\nlongitude : ' + results[0].geometry.location.lng());

            var reverse = (clickMarker != null);
            if (!results) {
                console.log("google maps non ha restituito una risposta valida.");
            } else {
                //
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(status, google.maps.GeocoderStatus.OK);
                    Latitude = results[0].geometry.location.lat();
                    Longitude = results[0].geometry.location.lng();

                    var route = '', street_number = '', postal_code = '', locality = '', prov = '';
                    var searchAddressComponents = results[0].address_components;
                    $.each(searchAddressComponents, function () {
                        if (this.types[0] == "route") {
                            route = this.short_name;
                            //console.log("route" + this.short_name);
                        }
                        if (this.types[0] == "street_number") {
                            //console.log("street_number" + this.short_name);
                            street_number = this.short_name;
                        }
                        if (this.types[0] == "postal_code") {
                            //console.log("postal_code" + this.short_name);
                            postal_code = this.short_name;
                        }
                        if (this.types[0] == "locality") {
                            //console.log("locality" + this.short_name);
                            locality = this.short_name;
                        }
                        if (this.types[0] == "administrative_area_level_2") {
                            //console.log("prov" + this.short_name);
                            prov = this.short_name;
                        }
                    });
                    //$('#updIndImpianto').val(route + ' ' + street_number + ' ' + postal_code + ' ' + locality);
                    var address = route + ' ' + street_number + ' ' + postal_code + ' ' + locality + ' ' + prov;

                    //AddressOnMap = address;

                    $('#Indirizzo_Add').val(address);
                    $('#Latitude_Add').val(Latitude);
                    $('#Longitude_Add').val(Longitude);

                    $('#Indirizzo_Upd').val(address);
                    $('#Latitude_Upd').val(Latitude);
                    $('#Longitude_Upd').val(Longitude);


                    var latlng = new google.maps.LatLng(Latitude, Longitude);

                    loadmap();
                    //map.setCenter(latlng);
                    //map.setZoom(15);

                    //map = new google.maps.Map(document.getElementById('googlemap'), {
                    //    zoom: 15,
                    //    zoomControl: false,
                    //    streetViewControl: false,
                    //    center: new google.maps.LatLng(Latitude, Longitude),
                    //    mapTypeId: google.maps.MapTypeId.ROADMAP
                    //});


                    var locations = [];
                    locations.push(latlng);
                    var positionalRequest = {
                        'locations': locations
                    }
                    elevator.getElevationForLocations(positionalRequest, function (results, status) {
                        if (status == google.maps.ElevationStatus.OK) {
                            console.log(results);
                            // Retrieve the first result
                            if (results[0]) {
                                elevation = parseInt(results[0].elevation);
                                showPosition(address, elevation);
                                //console.log('The elevation at this pointis ' + results[0].elevation + ' meters.');

                            } else {
                                elevation = 0;
                                console.log('No results found');
                            }
                        } else {
                            elevation = 0;
                            console.log('Elevation service failed due to: ' + status);
                        }
                    });
                    $('#AltSLM_Add').val(elevation);
                    $('#AltSLM_Upd').val(elevation);


                } else {
                    console.log('status<>google.maps.GeocoderStatus.OK');
                    if (!reverse) {
                        map.setCenter(new google.maps.LatLng(0.0, 0.0));
                        map.setZoom(1);
                    }
                }
            }
        }


        function getCoordinates(position) {
            Latitude = position.coords.latitude;
            Longitude = position.coords.longitude;
            var latlng = new google.maps.LatLng(Latitude, Longitude);
            geocode({ 'latLng': latlng });
            //showPosition();
        }
        function error() {
            alert("Geocoder failed");
        }

        function resetMap() {
            infowindow.close();

            if (clickMarker != null) {
                clickMarker.setMap(null);
                clickMarker = null;
            }

            for (var i in markers) {
                markers[i].setMap(null);
            }

            markers = [];
            selected = null;
        }

        function setInfowindowContent(address, Latitude, Longitude) {
            var html = "";
            html = '<div id="content" style="display:block;white-space: nowrap;width:200px;">';
            // html += '<div id="siteNotice">' + Cod + '</div>';
            html += '<div id="info_window">';
            html += '<i class="fa fa-home"></i>';
            html += 'current address:<br/> ';
            html += address;
            html += '<br />';
            html += '<strong>Lat :</strong> ' + Math.round(Latitude * 1000000) / 1000000 + '<br />';
            html += '<strong>Long :</strong> ' + Math.round(Longitude * 1000000) / 1000000 + '<br/>';
            html += '</div>';
            html += '</div>';
            return html;
        }
        //======================================================

    }); // document ready

});
