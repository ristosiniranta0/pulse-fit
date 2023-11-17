/*
   Filename: AdvancedDataVisualization.js

   This JavaScript code is a sophisticated and complex implementation of data visualization. 
   It uses D3.js library along with HTML and CSS to create a dynamic and interactive chart.
   The chart represents the population of different countries over the years.

   To execute the code, make sure to have the D3.js library linked in your HTML file.

*/

// Define chart dimensions and margins
const width = 800;
const height = 400;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };

// Create SVG container
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Read data from a CSV file
d3.csv("population_data.csv")
  .then(data => {

    // Format and preprocess the data
    const parseTime = d3.timeParse("%Y");
    data.forEach(d => {
      d.population = +d.population;
      d.year = parseTime(d.year);
    });

    // Create scales for x and y axes
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.year))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.population)])
      .range([height, 0]);

    // Create x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Add axes to the chart
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(yAxis);

    // Create a line generator function
    const line = d3
      .line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.population));

    // Draw the line chart
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add data points to the chart
    svg
      .selectAll(".data-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.population))
      .attr("r", 5)
      .attr("fill", "steelblue");

    // Add tooltips to the data points
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .selectAll(".data-point")
      .on("mouseover", d => {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip
          .html(`Year: ${d3.timeFormat("%Y")(d.year)}<br>Population: ${d.population}`)
          .style("left", `${d3.event.pageX + 10}px`)
          .style("top", `${d3.event.pageY - 10}px`);
      })
      .on("mouseout", d => {
        tooltip
          .transition()
          .duration(500)
          .style("opacity", 0);
      });
  })
  .catch(error => console.log(error));

// Add chart title
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", -20)
  .attr("text-anchor", "middle")
  .text("Population Chart");

// Add axis labels
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", height + margin.bottom - 10)
  .attr("text-anchor", "middle")
  .text("Year");

svg
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", -margin.left + 20)
  .attr("text-anchor", "middle")
  .text("Population (millions)");

// Add chart footnotes
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", height + margin.bottom + 30)
  .attr("text-anchor", "middle")
  .text("Data source: World Bank");

// Add chart credits
svg
  .append("text")
  .attr("x", width)
  .attr("y", height + margin.top + margin.bottom - 10)
  .attr("text-anchor", "end")
  .attr("font-size", "10px")
  .text("Code by Your Name");

// Styling for chart elements
svg
  .selectAll("text")
  .attr("font-family", "Arial, sans-serif")
  .attr("fill", "#333");

svg
  .selectAll(".axis line, .axis path")
  .attr("fill", "none")
  .attr("stroke", "#000")
  .attr("shape-rendering", "crispEdges");