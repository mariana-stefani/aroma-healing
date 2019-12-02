function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
        center: {
            lat: 9.072264,
            lng: 7.491302
        }
    });

    var locations = [
        //France
        [48.864716, 2.349014],
            //Brazil
            [-15.793889, -47.882778],
            //Egypt
            [30.045916, 31.224291],
            //China
            [39.916668, 116.383331],
            //India
            [28.644800, 77.216721],
            //Greece
            [37.983810, 23.727539],
            //Rome
            [41.902782, 12.496366],
            //Persia (Iran)
            [35.715298, 51.404343]
        ];

    for (var i = 0; i < locations.length; i++) {
        var city = locations[i];
        var marker = new google.maps.Marker({
            position: { lat: city[0], lng: city[1] },
            map: map,
        });
    }
}

document.getElementById("brazil").addEventListener("click", function (){
    document.getElementById("text").innerText = "Brazil é um lindo país";
});


































// function initMap() {
//     // Map options
//     var options = {
//         zoom: 2,
//         center: {
//             lat: 9.072264,
//             lng: 7.491302
//         }
//     }

//     //New Map
//     var map = new
//     google.maps.Map(document.getElementById('map'), options);


//     var markers = [
//         //France
//         {
//         coords:{lat:48.864716, lng:2.349014},
//         content:'<h3>France</h3><br/><span>Paris</span>'    
//         },
//         //Brazil
//         {   
//         coords:{lat:-15.793889, lng:-47.882778},
//         content:'<h3>Brasil</h3><br/><span>Paris</span>' 
//         },
//         //Egypt
//         {
//         coords:{lat:30.045916 , lng:31.224291},
//         content:'<h3>France</h3><br/><span>Paris</span>'
//          },
//         //China
//         {
//         coords:{lat:39.916668 , lng:116.383331},
//         content:'<h3>France</h3><br/><span>Paris</span>'
//         },
//         //India
//         {
//         coords:{lat:28.644800, lng:77.216721},
//         content:'<h3>France</h3><br/><span>Paris</span>'
//         }, 
//         //Greece
//         {
//         coords:{lat:37.983810, lng:23.727539},
//         content:'<h3>France</h3><br/><span>Paris</span>'
//         },
//         //Rome
//         {
//         coords:{lat:41.902782, lng:12.496366},
//         content:'<h3>France</h3><br/><span>Paris</span>'
//         },
//         //Persia (Iran)
//         {
//         coords:{lat:35.715298, lng:51.404343},
//         content:'<h3>France</h3><br/><span>Paris</span>'
//         }
//     ];

//     //Loop though markers
//     for(var i = 0; i < markers.length; i++){
//         addMarker(markers[i]);
//     }

//     //Add Marker Function
//     function addMarker(props){
//         var marker = new google.maps.Marker({
//             position: props.coords,
//             map:map,
//             icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

//         });

//         // Check content
//         if(props.content){
//             var infoWindow = new google.maps.InfoWindow({
//                 content:props.content
//             });

//             marker.addListener('click', function (){
//                 infoWindow.open(map, marker);
//             });
//         }
//     } 
// }