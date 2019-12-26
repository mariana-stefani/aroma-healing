let map;
let jsonData = "assets/Data/maps.json";
function initMap() {
    const mapOptions = {
        center: {
            lat: 9.072264,
            lng: 7.491302
        },
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    // method found on StackOverflow: https://stackoverflow.com/questions/28606149/load-data-from-json-file-into-map-markers-in-google-maps
    $.getJSON(jsonData, function (jsonMarkers) {
        $.each(jsonMarkers.markers, function (key, data) {
            let jsonMarker = new google.maps.Marker({
                map: map,
                position: { lat: data.lat, lng: data.lng },
                title: data.title
            });
            let description = data.description;
            bindInfoWindow(jsonMarker, map, infowindow, description);
            $("#selectlocation").append("<option value='" + [data.lat, data.lng, data.zoom].join("|") + "'>" + data.title + "</option>");
        });
    });
    // create an infoWindow for each marker
    let infowindow = new google.maps.InfoWindow();
    function bindInfoWindow(jsonMarker, map, infowindow, description) {
        google.maps.event.addListener(jsonMarker, "click", function () {
            infowindow.setContent(description);
            infowindow.open(map, jsonMarker);
        });
    }
}
// go to latlng of locations from drop-down menu selection
// Code from http://bl.ocks.org/amenadiel/353e4d04d4b2923c438e
$("#selectlocation").on("change", function () {
    let latlngzoom = $(this).val().split("|");
    let newzoom = 1 * latlngzoom[2],
        newlat = 1 * latlngzoom[0],
        newlng = 1 * latlngzoom[1];
    map.setZoom(newzoom);
    map.setCenter({ lat: newlat, lng: newlng });
});