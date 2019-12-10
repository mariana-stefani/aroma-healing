
var markers = [
    {
        "title": 'Frace',
        "lat": '48.864716',
        "lng": '2.349014',
        "description": 'This is France',
        "zoom": '5'
    },
    {
        "title": 'Brazil',
        "lat": '-15.793889',
        "lng": '-47.882778',
        "description": 'This is Brazil',
        "zoom": '5'
    },
    {
        "title": 'Egypt',
        "lat": '30.045916',
        "lng": '31.224291',
        "description": 'This is Egypt',
        "zoom": '5'
    }

];

function initMap() {
    var mapOptions = {
        center: {
            lat: 9.072264,
            lng: 7.491302
        },
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);


    //Code from https://www.aspsnippets.com/Articles/Google-Maps-API-V3-Add-multiple-markers-with-InfoWindow-to-Google-Map.aspx
    //Created infoWindow 
    var infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < markers.length; i++) {
        var data = markers[i];
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title
        });

        //Added click listener
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(data.description);
                infoWindow.open(map, marker);
            });
            jQuery("#selectlocation").append('<option value="' + [data.lat, data.lng, data.zoom].join('|') + '">' + data.title + '</option>');
            jQuery(document).on('change', '#selectlocation', function () {
                var latlngzoom = jQuery(this).val().split('|');
                var newzoom = 1 * latlngzoom[2],
                    newlat = 1 * latlngzoom[0],
                    newlng = 1 * latlngzoom[1];
                map.setZoom(newzoom);
                map.setCenter({ lat: newlat, lng: newlng });
            });
        })(marker, data);
    }
}
























// // markerData.forEach(function (data) {
// //     var newmarker = new google.maps.Marker({
// //         map: map,
// //         position: { lat: data.lat, lng: data.lng }
// //     });

// //     jQuery("#selectlocation").append('<option value="' + [data.lat, data.lng, data.zoom].join('|') + '">' + data.name + '</option>');
// // });

// jQuery(document).on('change', '#selectlocation', function () {
//     var latlngzoom = jQuery(this).val().split('|');
//     var newzoom = 1 * latlngzoom[2],
//         newlat = 1 * latlngzoom[0],
//         newlng = 1 * latlngzoom[1];
//     map.setZoom(newzoom);
//     map.setCenter({ lat: newlat, lng: newlng });
// });
// // }
