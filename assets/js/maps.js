//Maps 
let map;
let mapsJsonData = "assets/data/maps.json";
let countriesJsonData = "assets/data/countries.json";
let icons = "assets/images/lotus.png"
let countriesIcon = "assets/images/circle.png"

//Create Map
function initMap() {
    const mapOptions = {
        center: {
            lat: 9.072264,
            lng: 7.491302
        },
        zoom: 1.6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //Countries Markers
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // countries.forEach(function (data) {
    //     let countriesMarker = new google.maps.Marker({
    //         map: map,
    //         position: { lat: data.lat, lng: data.lng },
    //         title: data.name,
    //         icon: countriesIcon
    //     });
    $.getJSON(countriesJsonData, function (countriesMarkers) {
        $.each(countriesMarkers.countries, function (key, data) {
            let countriesMarker = new google.maps.Marker({
                map: map,
                position: { lat: data.lat, lng: data.lng },
                title: data.name,
                icon: countriesIcon
            });
            $("#selectlocation").append('<option value="' + [data.lat, data.lng, data.zoom].join('|') + '">' + data.name + '</option>');
        });
    });

        let infowindow = new google.maps.InfoWindow();
        let clusterMarkers = [];

        //JSON Markers Clustering
        //Method found on StackOverflow: https://stackoverflow.com/questions/28606149/load-data-from-json-file-into-map-markers-in-google-maps
        $.getJSON(mapsJsonData, function (mapsMarkers) {
            $.each(mapsMarkers.markers, function (key, data) {
                let latLng = new google.maps.LatLng(data.lat, data.lng);
                if (!data.title)
                    data.title = "" + key;
                let marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: icons,
                    title: data.title
                });

                clusterMarkers.push(marker);
                //Added click listener
                (function (marker, data) {
                    google.maps.event.addListener(marker, "click", function (e) {
                        infowindow.setContent(data.description);
                        infowindow.open(map, marker);
                        // map.setZoom(14);
                    });
                })(marker, data);
            });
            //StackOverflow helped to solve Marker Clustering issue: https://stackoverflow.com/questions/59521349/marker-clustering-on-google-maps-with-json-multi-markers
            let markerCluster = new MarkerClusterer(map, clusterMarkers,
                {
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                });
        });

    }

// Created drop-down menu for each Country
// Code from http://bl.ocks.org/amenadiel/353e4d04d4b2923c438e
$(document).on('change', '#selectlocation', function () {
        let latlngzoom = $(this).val().split('|');
        let newzoom = 1 * latlngzoom[2],
            newlat = 1 * latlngzoom[0],
            newlng = 1 * latlngzoom[1];
        map.setZoom(newzoom);
        map.setCenter({ lat: newlat, lng: newlng });
    });


    //Back to top Button

    $("#topBtn").click(function () {
        $(window).scrollTop(0);
    });
    //   $(window).ready(function() {
    //     if ($(this).scrollTop()) {
    //         $('#topBtn:hidden').stop(true, true).fadeIn();
    //     } else {
    //         $('#topBtn').stop(true, true).fadeOut();
    //     }
    // });


    //Recipe and Pie Chart update when selected recipe is clicked

    $("#stressReliefBtn").click(function () {
        $("#recipeInst-text").html(('<ul><li>Cedarwood: 6 drops</li> <br/> <li>Lavender: 4 drops</li> <br/> <li>Frankincense: 2 drops</li></ul>'));
        $(this).data(update(srChart));
    });

    $("#beHappyBtn").click(function () {
        $("#recipeInst-text").html(('<ul><li>Lavender: 5 drops</li> <br/> <li>Orange: 2 drops</li> <br/> <li>Lemon: 2 drops</li></ul>'));
        $(this).data(update(bhChart));
    });

    $("#stayFocusedBtn").click(function () {
        $("#recipeInst-text").html(('<ul><li>Orange: 6 drops</li> <br/> <li>Lemon: 2 drops</li> <br/> <li>Cedarwood: 3 drops</li></ul>'));
        $(this).data(update(sfChart));
    });

    $("#positiveEnergyBtn").click(function () {
        $("#recipeInst-text").html(('<ul><li>Copaiba: 4 drops</li> <br/> <li>Lavender: 3 drops</li> <br/> <li>Blue Tansy: 3 drops</li> <br/> <li>Frankincense: 2 drops</li></ul>'));
        $(this).data(update(peChart));
    });

    $("#peacefulSleepBtn").click(function () {
        $("#recipeInst-text").html(('<ul><li>Ylang Ylang: 3 drops</li> <br/> <li>Lavender: 2 drops</li> <br/> <li>Bergamot: 2 drops</li></ul>'));
        $(this).data(update(psChart));
    });