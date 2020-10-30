// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("/assets/data/data.csv").then(function(Data){
    var xPov = d3.scaleLinear()
      .domain([ .9*d3.min(Data, d => parseFloat(d.poverty)), 1.100* d3.max(Data, d => parseFloat(d.poverty))])
      .range([  0, width]);

      console.log(d3.max(Data, d => +d.poverty))
      console.log(d3.min(Data, d => +d.poverty))
      console.log('Healthcare')
      console.log(d3.max(Data, d => +d.healthcare))
      console.log(d3.min(Data, d => +d.healthcare))

    var yHealth = d3.scaleLinear()
        .domain([.9* d3.min(Data, d => parseFloat(d.healthcare)), 1.1* d3.max(Data, d => parseFloat(d.healthcare))])
        .range([height, 0]);

    
    var bottomAxis = d3.axisBottom(xPov);
    var leftAxis = d3.axisLeft(yHealth);


    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

    // Add leftAxis to the left side of the display
    chartGroup.append("g").call(leftAxis);

    // ADD Scatter
    var circleLabels   = chartGroup.selectAll('g stCir').data(Data).enter()

    circleLabels.append('text').text(d => d.abbr)
    .attr('dx' , d => xPov(d.poverty)-6)
    .attr( 'dy' , d=>  yHealth(d.healthcare)-margin.top + 3)
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("fill", "black");
    
    
    svg.append('g').selectAll(".stateCircle").data(Data)
      .enter().append('circle')
      .attr('class' , 'stateCircle').attr('r' , '10')
      .attr('cx' , d => xPov(d.poverty)+margin.left)
      .attr( 'cy' , d=> yHealth(d.healthcare))
      .style('fill' , 'teal' ).style('opacity' , 0.3)



      //y Axis 
      chartGroup.append('text').attr('transform' , 'rotate(-90)')
        .attr('y' ,0 - margin.left +40)
        .attr('x' ,0-height/1.5 )
        .attr('dy' , '1em')
        .attr('class' , 'axisText')
        .text('Lacks Healthcare (%)').
        attr( 'class' , 'label');

        // X Axis
        chartGroup.append('text')
        .attr('y' , 0 + height + 30 )
        .attr('x' , 0+ width /2.5)
        .attr('dy' , '1em')
        .attr('class' , 'axisText')
        .text('In Poverty (%)')
        .attr( 'class' , 'label');


        // title
        chartGroup.append('text')
        .attr('y' , 0 -25 )
        .attr('x' , 0+ width /2.5)
        .attr('dy' , '1em')
        .attr('class' , 'axisText')
        .text('Healthcare Vs Poverty')
        .attr( 'class' , 'label');


      // Add X label

      // Add Y label




})


