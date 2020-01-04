let map;
let jsonData = "assets/data/maps.json";

const countries = [
    //Australia
    { lat: -35.279382, lng: 149.129349, zoom: 4, name: "Australia" },
    //Brazil
    { lat: -15.793889, lng: -47.882778, zoom: 4, name: "Brazil" },
    //Canada
    { lat: 45.422186, lng: -75.692438, zoom: 3, name: "Canada" },
    //China
    { lat: 39.904218, lng: 116.407432, zoom: 5, name: "China" },
    //France
    { lat: 48.857497, lng: 2.347628, zoom: 5, name: "France" },
    //India
    { lat: 28.613068, lng: 77.207920, zoom: 4.5, name: "India" },
    //Japan
    { lat: 35.681244, lng: 139.767123, zoom: 6, name: "Japan" },
    //New Zeland
    { lat: -41.289315, lng: 174.777456, zoom: 5.5, name: "New Zealand" },
    //UK
    { lat: 51.508049, lng: -0.128050, zoom: 5, name: "UK" },
    //USA
    { lat: 38.904845, lng: -77.036535, zoom: 3, name: "USA" },
    //South Africa
    { lat: -33.925323, lng: 18.423684, zoom: 5, name: "South Africa" },
    //Taiwan
    { lat: 25.012994, lng: 121.461239, zoom: 7, name: "Taiwan" }
];

//Icon made by Pixel perfect from www.flaticon.com
let icons = "assets/images/lotus.png"
//Icon made by Smashicons from www.flaticon.com
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
    countries.forEach(function (data) {
        let countriesMarker = new google.maps.Marker({
            map: map,
            position: { lat: data.lat, lng: data.lng },
            title: data.name,
            icon: countriesIcon
        });
        $("#selectlocation").append('<option value="' + [data.lat, data.lng, data.zoom].join('|') + '">' + data.name + '</option>');
    });


    let infowindow = new google.maps.InfoWindow();
    let clusterMarkers = [];

    //JSON Markers Clustering
    //Method found on StackOverflow: https://stackoverflow.com/questions/28606149/load-data-from-json-file-into-map-markers-in-google-maps
    $.getJSON(jsonData, function (jsonMarkers) {
        $.each(jsonMarkers.markers, function (key, data) {
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
$("#topBtn").click(function(){
    $(window).scrollTop(0);
  });
//   $(window).ready(function() {
//     if ($(this).scrollTop()) {
//         $('#topBtn:hidden').stop(true, true).fadeIn();
//     } else {
//         $('#topBtn').stop(true, true).fadeOut();
//     }
// });