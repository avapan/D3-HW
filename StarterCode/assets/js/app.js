// @TODO: YOUR CODE HERE!
//define svg area for gragh
var svgWidth = 1200;
var svgHeight = 660;

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var charWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// append svg and group
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// load csv
d3.csv("data/data.csv", function(err,healthData){
	if (err) throw err;

	healthData.forEach(function(data){
		data.poverty = +data.poverty;
		data.healthcare = +data.healthcare;
    });
    
    // Create scale 
    var xLinearScale = d3.scaleLinear().range([0, chartWidth]);
    var yLinearScale = d3.scaleLinear().range([chartHeight,0]);
 
    //Scale the domain.
    xLinearScale.domain([0, d3.max(healthData, function(data){
         return +data.poverty;
    })]);
 
    yLinearScale.domain([0, d3.max(healthData,function(data){
         return +data.healthcare;
    })]);

	// Create axis functions
	var bottomAxis = d3.axisBottom(xLinearScale);
	var leftAxis = d3.axisLeft(yLinearScale);    
    
    //Create Circles
	var circlesGroup = chartGroup.selectAll("circle")
	  .data(healthData)
	  .enter()
	  .append("circle")
	  .attr("cx", d => xLinearScale(d.poverty))
	  .attr("cy", d => yLinearScale(d.healthcare))
	  .attr("r", "15")
      .attr("class", "stateCircle");

    var circlesText =  chartGroup.selectAll("text")
      .data(healthData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare))
      .attr("dy", ".35em")
      .text(function(d){
           return d.abbr;
       })
      .attr("class", "stateText");
});   