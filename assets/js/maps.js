var markerData = [
    //France
    //Courses
    {
        // icon: icon,
        content: '<div id="web-info"> <h6><a target="_blank" href="https://www.ipal-formation.com/">Ipal</a></h6><p>Artomatherapy and Essential Oils Training</p></div>',
        position: { lat: 43.583627, lng: 3.814796 }
    },
    {
        // icon: icon,
        content: '<div id="web-info"> <h6><a target="_blank" href="http://www.ecole-era.ch/">Ecole Romande d\'Aromathérapie ERA</a></h6><p>Aromatherapy Course</p></div>',
        position: { lat: 46.521448, lng: 6.633112 }
    },
    {
        // icon: icon,
        content: '<div id="web-info"> <h6><a target="_blank" href="https://www.formationaromatherapie.com/">French Aromatherapy Federation</a></h6><p>Aromatherapy and Essential Oils Training</p></div>',
        position: { lat: 43.651153, lng: 1.513574 }
    },
    {
        // icon: icon,
        content: '<div id="web-info"> <h6><a target="_blank" href="https://www.ecole-aroma.com/">French School  of Integrative Aromatherapy</a></h6><p>Integrative Aromatherapy Practitioner Training</p></div>',
        position: { lat: 48.829997, lng: 2.227497 }
    },
    {
        // icon: icon,
        content: '<div id="web-info"> <h6><a target="_blank" href="https://www.laromatheque.fr/">L\'Aromathèque Jacobins</a></h6><p>Complete Essential Oils Training</p></div>',
        position: { lat: 45.761047, lng: 4.832847 }
    }
];

// GLOBAL SETTINGS
// Define variables.
var google;
var map;


// Tutorial from: https://developers.google.com/maps/documentation/javascript/controls

// var mapOptions = {
//     zoom: 14,
//     center: {
//         lat: 51.507886, lng: -0.127725
//     },
//     mapTypeId: 'roadmap',
//     zoomControl: true,
//     mapTypeControl: false,
//     scaleControl: true,
//     streetViewControl: false,
//     rotateControl: false,
//     fullscreenControl: false
// };




// Maps Instalation
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
        center: {
            lat: 9.072264,
            lng: 7.491302
        }
    });

    // Add markers and display infowindows on mouseover.
    // Code from: https://codepen.io/olivertaylor/pen/BWWNeb?editors=0010#0
    // var InfoWindows = new google.maps.InfoWindow({
    //     maxWidth: 280
    // });

    markerData.forEach(function (data) {
        var marker = new google.maps.Marker({
            position: { lat: data.position.lat, lng: data.position.lng },
            map: map,
            // icon: icons[data.icon].icon,
            title: data.title
        });

        
        marker.addListener('click', function () {
            InfoWindows.open(map, this);
            InfoWindows.setContent(data.content);
        });
    });
};

//     // Add search and link it to the UI element using the Google Place Autocomplete feature:
//     // people can enter geographical searches, and the search box will return a
//     // pick list containing a mix of places and predicted search terms.
//     // Tutorial from: https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
//     var input = document.getElementById('search');
//     var searchBox = new google.maps.places.SearchBox(input);
//     map.controls[google.maps.ControlPosition.TOP].push(input);

//     // Bias the SearchBox results towards current map's viewport.
//     map.addListener('bounds_changed', function () {
//         searchBox.setBounds(map.getBounds());
//     });

//     var markers = [];

//     // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
//     searchBox.addListener('places_changed', function () {
//         var places = searchBox.getPlaces();
//         if (places.length == 0) {
//             return;
//         }

//         // Clear out the old markers.
//         markers.forEach(function (marker) {
//             marker.setMap(null);
//         });

//         markers = [];

//         // For each place, get the icon, name and location.
//         var bounds = new google.maps.LatLngBounds();
//         places.forEach(function (place) {
//             if (!place.geometry) {
//                 console.log("Returned place contains no geometry");
//                 return;
//             }

//             // Converting MarkerImage objects to type Icon
//             var icon = {
//                 url: place.icon,
//                 scaledSize: new google.maps.Size(24, 24),
//                 origin: new google.maps.Point(0, 0),
//                 anchor: new google.maps.Point(17, 34)
//             };

//             // Create a marker for each place.
//             markers.push(new google.maps.Marker({
//                 map: map,
//                 icon: icon,
//                 title: place.name,
//                 position: place.geometry.location,
//             }));

//             if (place.geometry.viewport) {
//                 // Only geocodes have viewport.
//                 bounds.union(place.geometry.viewport);
//             }
//             else {
//                 bounds.extend(place.geometry.location);
//             }
//         });
//         map.fitBounds(bounds);
//     });

// }

// Call the function and display the map on the browser.
google.maps.event.addDomListener(window, 'load', initMap);
