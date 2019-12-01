function initMap() {
    // Map options
    var options = {
        zoom: 2,
        center: {
            lat: 9.072264,
            lng: 7.491302
        }
    }

    //New Map
    var map = new
    google.maps.Map(document.getElementById('map'), options);


    //Countries
    //France
    addMarker({
        coords:{lat:48.864716, lng:2.349014},
        content:'<h3>France</h3><br/><span>Paris</span>'    
    });
    //Brazil
    addMarker({
        coords:{lat:-15.793889, lng:-47.882778},
        content:'<h3>France</h3><br/><span>Paris</span>' 
    });
    //Egypt
    addMarker({
        coords:{lat:30.045916 , lng:31.224291},
        content:'<h3>France</h3><br/><span>Paris</span>'
    });
    //China
    addMarker({
        coords:{lat:39.916668 , lng:116.383331},
        content:'<h3>France</h3><br/><span>Paris</span>'
    });
    //India
    addMarker({
        coords:{lat:28.644800, lng:77.216721},
        content:'<h3>France</h3><br/><span>Paris</span>'
    });
    //Greece
    addMarker({
        coords:{lat:37.983810, lng:23.727539},
        content:'<h3>France</h3><br/><span>Paris</span>'
    });
    //Rome
    addMarker({
        coords:{lat:41.902782, lng:12.496366},
        content:'<h3>France</h3><br/><span>Paris</span>'
    });
    //Persia
    addMarker({
        coords:{lat:35.715298, lng:51.404343},
        content:'<h3>France</h3><br/><span>Paris</span>'
    });

    //Add Marker Function
    function addMarker(props){
        var marker = new google.maps.Marker({
            position: props.coords,
            map:map,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

        });

        // Check content
        if(props.content){
            var infoWindow = new google.maps.InfoWindow({
                content:props.content
            });
        
            marker.addListener('click', function (){
                infoWindow.open(map, marker);
            });
        }
    } 
}










































//var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // var locations = [
    //     { lat: 40.785091, lng: -73.968285 },
    //     { lat: 41.084045, lng: -73.874245 },
    //     { lat: 40.754932, lng: -73.984016 }
    // ];

    // var markers = locations.map(function (location, i) {
    //     return new google.maps.Marker({
    //         position: location,
    //         label: labels[i % labels.length]
    //     });
    // });

    // var markerCluster = new MarkerClusterer(map, markers,
    //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });