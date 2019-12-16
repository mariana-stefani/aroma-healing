//Tutorial from: https://www.d3-graph-gallery.com/graph/pie_changeData.html
// set the dimensions and margins of the graph
var width = 320
    height = 400
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#recipe-graph")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// create 2 data_set
//Aromatic Profile
//a: woody, b: floral, c: resinous, d: herbaceus, e: citrus, f: grassy, 
var data1 = {a:56.2, b: 25, c:18.8} //woody, floral, resinous
var data2 = {b: 62.5, e: 37.5} //floral, citrus
var data3 = {a: 52.9, e:47.1} //woody, citrus
var data4 = {b: 56.2, c: 43.8} //floral, resinous
var data5 = {b: 82.6, e: 17.4} //floral, citrus

// set the color scale
var color = d3.scaleOrdinal()
  .domain(["a", "b", "c", "d", "e", "f"])
  .range(d3.schemeDark2);

// A function that create / update the plot for a given variable:
function update(data) {

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data))

  // map to data
  var u = svg.selectAll("path")
    .data(data_ready)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
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
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)

  // remove the group that is not present anymore
  u
    .exit()
    .remove()

}

// Initialize the plot with the first dataset
update(data1)


//Change Recipe according to button selected
function selectCategory(category, results) {
    var postResults = document.getElementById(results);
    postResults.innerHTML = category;
  }