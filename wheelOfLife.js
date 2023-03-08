/**
 * The MIT License (MIT)
 * Copyright (c) 2023 Matthias Kappeller
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t =
        "undefined" != typeof globalThis ? globalThis : t || self).WheelOfLife =
        e());
})(this, function () {
  "use strict";
  return {
    setup: function (chartEl, sectionsEl, config) {
      const chartSeries = Array(config.length).fill(10);
      const chartLabels = config.map((c) => c.name);
      const chartColors = config.map((c) => c.color);

      var options = {
        chart: {
          type: "polarArea",
          toolbar: {
            show: true,
          },
          animations: {
            animateGradually: {
              enabled: false,
            },
          },
        },
        series: chartSeries,
        labels: chartLabels,
        colors: chartColors,
        yaxis: {
          max: 10,
        },
        xaxis: {
          labels: {
            style: {
              colors: chartColors,
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (_, opt) => config[opt.seriesIndex].name,
        },
        legend: { show: false },
        plotOptions: {
          radar: {
            polygons: {
              connectorColors: chartColors,
              colors: chartColors,
            },
          },
        },
      };
      var chart = new ApexCharts(chartEl, options);
      chart.render();

      for (let i = 0; i < config.length; i++) {
        const c = config[i];

        const section = document.createElement("section");
        // Header
        const header = document.createElement("h1");
        header.textContent = c.name;
        section.appendChild(header);
        // Input
        const input = document.createElement("input");
        input.id = `input-${i}`;
        input.type = "range";
        input.min = "1";
        input.max = "10";
        input.step = "1";
        input.value = "10";
        input.oninput = (e) => {
          chartSeries[i] = e.target.value;
          chart.updateSeries(chartSeries, false);
        };
        section.append(input);
        // Description
        const description = document.createElement("p");
        description.innerText = c.description;
        section.appendChild(description);

        // Add section
        sectionsEl.appendChild(section);
      }
    },
  };
});
