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





    var margin = {top: 10, right: 50, bottom: 20, left: 50},
    width = 250 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var min = Infinity,
        max = -Infinity;

    var chart = d3.box()
        .whiskers(iqr(1.5))
        .width(width)
        .height(height);



function draw_third(csv) {



    var data = [];

    csv.forEach(function(x) {
      var e = Math.floor(x.Expt - 1),
          s = Math.floor(x.Speed),
          d = data[e];
      if (!d) d = data[e] = [s];
      else d.push(s);
      if (s > max) max = s;
      if (s < min) min = s;
    });

    console.log(data);

    chart.domain([min, max]);

    var svg = d3.select("#third_plot").selectAll("svg")
        .data(data)
      .enter().append("svg")
        .attr("class", "box")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
      .append("g")
        .call(chart);
  
    setInterval(function() {
      svg.datum(randomize).call(chart.duration(1000));
    }, 2000);

};








function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  return d.map(d.randomizer);
}

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















