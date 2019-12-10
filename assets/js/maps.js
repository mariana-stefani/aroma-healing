var markers = [
    {
        "title": 'France',
        "lat": '43.583627',
        "lng": '3.814796 ',
        "description": '<div id="web-info"> <h6><a target="_blank" href="https://www.ipal-formation.com/">Ipal</a></h6><p>Artomatherapy and Essential Oils Training</p></div>',
        "zoom": '5'
    },
    {
        "title": 'France',
        "lat": '46.521448',
        "lng": '6.633112',
        "description": '<div id="web-info"> <h6><a target="_blank" href="http://www.ecole-era.ch/">Ecole Romande d\'Aromathérapie ERA</a></h6><p>Aromatherapy Course</p></div>',
        "zoom": '5'
    },
    {
        "title": 'France',
        "lat": '43.651153',
        "lng": '1.513574',
        "description": '<div id="web-info"> <h6><a target="_blank" href="https://www.formationaromatherapie.com/">French Aromatherapy Federation</a></h6><p>Aromatherapy and Essential Oils Training</p></div>',
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


    //Tutorial from https://www.aspsnippets.com/Articles/Google-Maps-API-V3-Add-multiple-markers-with-InfoWindow-to-Google-Map.aspx
    //Created infoWindow 
    var infowindow = new google.maps.InfoWindow();

    for (var i = 0; i < markers.length; i++) {
        var markersData = markers[i];
        var coords = new google.maps.LatLng(markersData.lat, markersData.lng);
        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: markersData.title
        });

        //Added click listener
        (function (marker, markersData) {
            google.maps.event.addListener(marker, "click", function (e) {
                infowindow.setContent(markersData.description);
                infowindow.open(map, marker);
            });

            //Code from http://bl.ocks.org/amenadiel/353e4d04d4b2923c438e
            jQuery("#selectlocation").append('<option value="' + [markersData.lat, markersData.lng, markersData.zoom].join('|') + '">' + markersData.title + '</option>');
            jQuery(document).on('change', '#selectlocation', function () {
                var latlngzoom = jQuery(this).val().split('|');
                var newzoom = 1 * latlngzoom[2],
                    newlat = 1 * latlngzoom[0],
                    newlng = 1 * latlngzoom[1];
                map.setZoom(newzoom);
                map.setCenter({ lat: newlat, lng: newlng });
            });
        })(marker, markersData);
    }
};


//France
    //Courses
    
//    
//     {
//         // icon: icon,
//         content: '<div id="web-info"> <h6><a target="_blank" href="https://www.ecole-aroma.com/">French School  of Integrative Aromatherapy</a></h6><p>Integrative Aromatherapy Practitioner Training</p></div>',
//         position: { lat: 48.829997, lng: 2.227497 }
//     },
//     {
//         // icon: icon,
//         content: '<div id="web-info"> <h6><a target="_blank" href="https://www.laromatheque.fr/">L\'Aromathèque Jacobins</a></h6><p>Complete Essential Oils Training</p></div>',
//         position: { lat: 45.761047, lng: 4.832847 }
//     }
// ];