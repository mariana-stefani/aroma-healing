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


    var markers = [
        //France
        {
        coords:{lat:48.864716, lng:2.349014},
        content:'<h3>France</h3><br/><span>Paris</span>'    
        },
        //Brazil
        {   
        coords:{lat:-15.793889, lng:-47.882778},
        content:'<h3>Brasil</h3><br/><span>Paris</span>' 
        },
        //Egypt
        {
        coords:{lat:30.045916 , lng:31.224291},
        content:'<h3>France</h3><br/><span>Paris</span>'
         },
        //China
        {
        coords:{lat:39.916668 , lng:116.383331},
        content:'<h3>France</h3><br/><span>Paris</span>'
        },
        //India
        {
        coords:{lat:28.644800, lng:77.216721},
        content:'<h3>France</h3><br/><span>Paris</span>'
        }, 
        //Greece
        {
        coords:{lat:37.983810, lng:23.727539},
        content:'<h3>France</h3><br/><span>Paris</span>'
        },
        //Rome
        {
        coords:{lat:41.902782, lng:12.496366},
        content:'<h3>France</h3><br/><span>Paris</span>'
        },
        //Persia (Iran)
        {
        coords:{lat:35.715298, lng:51.404343},
        content:'<h3>France</h3><br/><span>Paris</span>'
        }
    ];

    //Loop though markers
    for(var i = 0; i < markers.length; i++){
        addMarker(markers[i]);
    }

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
                close(info);
                infoWindow.open(map, marker);
            });
        }
    } 

    // var contentString = '<div id="content">'+
    //   '<div id="siteNotice">'+
    //   '</div>'+
    //   '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    //   '<div id="bodyContent">'+
    //   '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    //   'sandstone rock formation in the southern part of the '+
    //   'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    //   'south west of the nearest large town, Alice Springs; 450&#160;km '+
    //   '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    //   'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    //   'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    //   'Aboriginal people of the area. It has many springs, waterholes, '+
    //   'rock caves and ancient paintings. Uluru is listed as a World '+
    //   'Heritage Site.</p>'+
    //   '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    //   'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    //   '(last visited June 22, 2009).</p>'+
    //   '</div>'+
    //   '</div>';
}
