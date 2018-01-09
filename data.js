Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  },
  global: {
    useUTC: false
  }
});
$.get('https://antisocial.club/listings.csv', function(csv) {

  var highchartsFormat = [{
    name: "Listing amount",
    data: []
  }];

  $('#listing').highcharts({
    chart: {
      type: 'line'
    },
    data: {
      csv: csv,
    },

    credits: {
      enabled: false // removes Highcharts.com in bottom
    },
    title: {
      text: 'Amount of Listing of adidas Yeezy on ebay.com'
    },
    yAxis: {
      title: {
        text: 'Listing Amount'
      }
    },
    xAxis: { // required, or the x axis is rendered as numbers
      type: 'datetime',
      labels: {
        enabled: true
      }
    },
    plotOptions: {
      series: {
        color: '#33FF44'
      }
    },
  });
});

// Adapted from https://github.com/ejb/highcharts-tutorial/blob/b6b4ce0eb8c1afcb0d41e8f69dc577d810695589/examples/chart2.html
$.getJSON('https://antisocial.club/sold.json', function(data) {

  // an empty series to add our data into
  var highchartsFormat = [{
    name: "Price",
    data: []
  }];

  // loop through each line of the spreadsheet...
  $.each(data, function(i,  row){
    var timestamp = row.endDate * 1000;
    // ... and add to the Highcharts-formatted data object
    highchartsFormat[0].data.push([ timestamp, parseFloat(row["price"]) ]);
  });


  // then create the chart
  $('#sales').highcharts({
    series: highchartsFormat,
    chart: {
    type: 'scatter',
    linewidth: 0,
    marker: {
      radius: 0.5
    }
  },
    xAxis: {
      type: 'datetime', // required, or the x axis is rendered as numbers
      labels: {
        enabled: true
      }
    },
    yAxis: {
      title: {
          text: 'Sales price (USD)'
        }
      },
    credits: {
      enabled: false // removes Highcharts.com in bottom
    },
    title: {
      text: 'Sales of Adidas Yeezy V2 Blue Tint / Beluga on eBay'
    },
    colors: ['#03529E'],
    tooltip: {
      formatter: function () {
        let timestamp = new Date(this.x);
      let year = timestamp.getFullYear();
      let month = ("0" + (timestamp.getMonth() + 1)).substr(-2);
      let day = ("0" + timestamp.getDate()).substr(-2);
      var hour = ("0" + timestamp.getHours()).substr(-2);
      var minutes = ("0" + timestamp.getMinutes()).substr(-2);
      var seconds = ("0" + timestamp.getSeconds()).substr(-2);
      let formattedTime = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        var s = formattedTime + '<br/>Sale price USD ' + this.y;
        return s;
      },
      valuePrefix: 'USD ',
      xDateFormat: {
        year: '%y'
      }
    }
  })
});
