//Tutorial from: https://www.d3-graph-gallery.com/graph/barplot_button_data_hard.html-->
const data1 = [
    { group: "Cedarwood", value: 6 },
    { group: "Lavender", value: 4 },
    { group: "Frankincense", value: 2 }
];

const data2 = [
    { group: "Patchouli", value: 4 },
    { group: "Orange", value: 4 },
    { group: "Ylang Ylang", value: 2 },
    { group: "Bergamot", value: 1}
];

const data3 = [
    { group: "Peppermint", value: 3 },
    { group: "Rosemary", value: 3 },
    { group: "Orange", value: 3 }
];

const data4 = [
    { group: "Copaiba", value: 4 },
    { group: "Lavender", value: 3 },
    { group: "Blue Tansy", value: 3 },
    { group: "Frankincense", value: 2 }
];

const data5 = [
    { group: "Ylang Ylang", value: 3 },
    { group: "Lavender", value: 2 },
    { group: "Bergamot", value: 2 }
];

// var data6 = [
//     { group: "Peppermint", value: 4 },
//     { group: "Eucalyptus", value: 3 },
//     { group: "Lemon", value: 2 },
//     { group: "Lavender", value: 2 }
// ];

// set the dimensions and margins of the graph
let margin = { top: 90, right: 10, bottom: 20, left: 60 },
    width = 320 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


let svg = d3.select("#recipe-graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
let x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);
let xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
let y = d3.scaleLinear()
    .range([height, 0]);
let yAxis = svg.append("g")
    .attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function update(data) {

    // Update the X axis
    x.domain(data.map(function (d) { return d.group; }))
    xAxis.call(d3.axisBottom(x))

    // Update the Y axis
    y.domain([0, d3.max(data, function (d) { return d.value })]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // Create the u variable
    let u = svg.selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
        .attr("x", function (d) { return x(d.group); })
        .attr("y", function (d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.value); })
        .attr("fill", "#CEDDC9")

    // If less group in the new dataset, I delete the ones not in use anymore
    u
        .exit()
        .remove()
}

// Initialize the plot with the first dataset
update(data1)
