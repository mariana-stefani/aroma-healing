//PIE CHART

//Tutorial from: https://www.d3-graph-gallery.com/graph/pie_changeData.html
// set the dimensions and margins of the pie chart
let width = 300
let height = 300
let margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
let radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called '#recipe-graph'
let svg = d3.select("#recipe-graph")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// create 2 data_set
//Aromatic Profile

let srChart = {woody:56.2, floral: 25, resinous:18.8} 
let bhChart = {floral: 62.5, citrus: 37.5} 
let sfChart = {woody: 52.9, citrus:47.1} 
let peChart = {floral: 56.2, resinous: 43.8} 
let psChart = {floral: 82.6, citrus: 17.4} 

let color = d3.scaleOrdinal()
  .domain(["woody", "floral", "resinous", "herbaceus", "citrus", "grassy"])
  .range(d3.schemeSet2);

// A function that create / update the plot for a given variable:
function update(data) {
  let pie = d3.pie()
    .value(function(d) {return d.value; })
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
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)
  u
    .exit()
    .remove()
}
update(srChart)

//Change Recipe according to button selected
function selectCategory(category, results) {
    let postResults = document.getElementById(results);
    postResults.innerHTML = category;
  }