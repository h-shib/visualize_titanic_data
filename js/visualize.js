function draw_first(data) {
  /*
    D3.js setup code
  */
    "use strict";
    var margin = 75,
      width = 1000 - margin,
      height = 400 - margin;

    d3.select("#first_plot")
      .append("h3")
      .text("Survival by Gender")

    var margin = 75,
      width = 1000 - margin,
      height = 400 - margin;

    // First plot
    var firstSvg = d3.select("#first_plot")
        .append("svg")
          .attr("width", width + margin)
          .attr("height", height + margin)
        .append('g')
          .attr('class','chart');

    var firstChart = new dimple.chart(firstSvg, data);
    firstChart.addCategoryAxis("x", "Sex");
    firstChart.addMeasureAxis("y", "count");
    firstChart.addSeries("Survived_text", dimple.plot.bar)
              .addOrderRule(["Survived", "Death"]);
    firstChart.addLegend(width, 50, 70, 200, "Left");
    firstChart.draw();
};

function draw_second(data) {
    // Second plot
    "use strict";
    var margin = 75,
      width = 1000 - margin,
      height = 400 - margin;

    d3.select("#second_plot")
      .append("h3")
      .text("Survival by Passenger Class")
    
    var secondSvg = d3.select("#second_plot")
    .append("svg")
      .attr("width", width + margin)
      .attr("height", height + margin)
    .append('g')
      .attr('class','chart');

    var secondChart = new dimple.chart(secondSvg, data);
    secondChart.addCategoryAxis("x", "PassengerClass")
               .addOrderRule(["First", "Second", "Third"]);
    secondChart.addMeasureAxis("y", "Count");
    secondChart.addSeries("Life and Death", dimple.plot.bar)
               .addOrderRule(["Survived", "Death"]);
    secondChart.addLegend(width, 50, 70, 200, "Left");
    secondChart.draw();
};

function draw_third(data) {

    var margin = {top: 10, right: 50, bottom: 20, left: 50},
    width = 350 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

    d3.select("#third_plot")
      .append("h3")
      .text("Box plot of Passengers' Fare between survived and died");

    d3.select("#third_plot")
      .append("div")
      .append("p")
      .text("Dead")
      .classed("third_plot_label1", true)
      .append("p")
      .text("Survived")
      .classed("third_plot_label2", true);

    var min = Infinity,
        max = -Infinity;

    var chart = d3.box()
        .whiskers(iqr(1.5))
        .width(width)
        .height(height);

    var plot_data = [];

    data.forEach(function(x) {
      var e = Math.floor(x.Survived),
          s = Math.floor(x.Fare),
          d = plot_data[e];
      if (s > 200) return;
      if (!d) d = plot_data[e] = [s];
      else d.push(s);
      if (s > max) max = s;
      if (s < min) min = s;
    });


    chart.domain([min, max]);

    var svg = d3.select("#third_plot").selectAll("svg")
        .data(plot_data)
      .enter().append("svg")
        .attr("class", "box")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(chart);
};

function randomizer(d) {
  var k = d3.max(d) * .02;
  return function(d) {
    return Math.max(min, Math.min(max, d + k * (Math.random() - .5)));
  };
}

// Returns a function to compute the interquartile range.
function iqr(k) {
  return function(d, i) {
    var q1 = d.quartiles[0],
        q3 = d.quartiles[2],
        iqr = (q3 - q1) * k,
        i = -1,
        j = d.length;
    while (d[++i] < q1 - iqr);
    while (d[--j] > q3 + iqr);
    return [i, j];
  };
}