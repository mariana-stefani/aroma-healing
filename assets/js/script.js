//Global Variables
let map;
let mapsJsonData = "assets/data/maps.json";
let countriesJsonData = "assets/data/countries.json";
let icons = "assets/images/lotus.png"
let countriesIcon = "assets/images/circle.png"
let buttons = $(".recipeBtn");
let width = 300;
let height = 300;
let margin = 40;
let radius = Math.min(width, height) / 2 - margin;

let recipeText;

/**
 * Creates Map
 */
function initMap() {
    const mapOptions = {
        center: {
            lat: 9.072264,
            lng: 7.491302
        },
        zoom: 1.6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
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

    /**
     * JSON Markers Clustering - Method found on StackOverflow: https://stackoverflow.com/questions/28606149/load-data-from-json-file-into-map-markers-in-google-maps
     */
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

            /**
             * Added click listener
             * @param {array} marker
             * @param {object} data
             */
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infowindow.setContent(data.description);
                    infowindow.open(map, marker);
                    // map.setZoom(14);
                });
            })(marker, data);
        });

        let markerCluster = new MarkerClusterer(map, clusterMarkers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
        );
    });
};

/**
 * Created drop-down menu for each Country - Code from http://bl.ocks.org/amenadiel/353e4d04d4b2923c438e
 */
$(document).on('change', '#selectlocation', function () {
    let latlngzoom = $(this).val().split('|');
    let newzoom = 1 * latlngzoom[2],
        newlat = 1 * latlngzoom[0],
        newlng = 1 * latlngzoom[1];
    map.setZoom(newzoom);
    map.setCenter({ lat: newlat, lng: newlng });
});


/**
 * Back to top Button
 */
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

/**
 * Recipe and Pie Chart update when selected recipe is clicked
 * Prevent scroll of the page to the top when buttons are clicked
 */

buttons.click(function (event) {
    event.preventDefault();
    if (this.id === "stressReliefBtn") {
        recipeText = "<ul><li>Cedarwood: 6 drops</li> <br/> <li>Lavender: 4 drops</li> <br/> <li>Frankincense: 2 drops</li></ul>";
        $(this).data(update(srChart));
    } else if (this.id === "beHappyBtn") {
        recipeText = "<ul><li>Lavender: 5 drops</li> <br/> <li>Orange: 2 drops</li> <br/> <li>Lemon: 2 drops</li></ul>";
        $(this).data(update(bhChart));
    } else if (this.id === "stayFocusedBtn") {
        recipeText = "<ul><li>Orange: 6 drops</li> <br/> <li>Lemon: 2 drops</li> <br/> <li>Cedarwood: 3 drops</li></ul>";
        $(this).data(update(sfChart));
    } else if (this.id === "positiveEnergyBtn") {
        recipeText = "<ul><li>Copaiba: 4 drops</li> <br/> <li>Lavender: 3 drops</li> <br/> <li>Blue Tansy: 3 drops</li> <br/> <li>Frankincense: 2 drops</li></ul>";
        $(this).data(update(peChart));
    } else if (this.id === "peacefulSleepBtn") {
        recipeText = "<ul><li>Ylang Ylang: 3 drops</li> <br/> <li>Lavender: 2 drops</li> <br/> <li>Bergamot: 2 drops</li></ul>";
        $(this).data(update(psChart));
    } 
    $("#recipeInst-text").html(recipeText);
});

/**
 * PIE CHART - Tutorial from: https://www.d3-graph-gallery.com/graph/pie_changeData.html
 */

let svg = d3.select("#recipe-graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

/**
 * Aromatic Profile Data
 */
let srChart = { woody: 56.2, floral: 25, resinous: 18.8 }
let bhChart = { floral: 62.5, citrus: 37.5 }
let sfChart = { woody: 52.9, citrus: 47.1 }
let peChart = { floral: 56.2, resinous: 43.8 }
let psChart = { floral: 82.6, citrus: 17.4 }
let color = d3.scaleOrdinal()
    .domain(["woody", "floral", "resinous", "herbaceus", "citrus", "grassy"])
    .range(d3.schemeSet2);

/**
 * A function that create / update the plot for a given variable:
 * @param {string} data 
 */
function update(data) {
    let pie = d3.pie()
        .value(function (d) { return d.value; })
    let data_ready = pie(d3.entries(data))

    let u = svg.selectAll("path")
        .data(data_ready)
    u
        .enter()
        .append('path')
        .merge(u)
        .transition()
        .duration(1000)
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill', function (d) { return (color(d.data.key)) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)
    u
        .exit()
        .remove()
}
update(srChart)