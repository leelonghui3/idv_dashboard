//time series for one species

var divID = '#panel-5-indicators';
var sitecode = 'LW2';
var now = new Date();
var weekago = new Date();
weekago.setDate(now.getDate()-7);


var startdate = '21-11-2015';
var enddate ='28-11-2015';
var URL = 'http://api.erg.kcl.ac.uk/AirQuality/Data/Wide/Site/SiteCode='+ sitecode + 
          '/StartDate=' + weekago.getDate() + '-' + weekago.getMonth() + '-' + weekago.getFullYear() + 
          '/EndDate='+ now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear() +'/Json';


$.getJSON(URL, processResult);

function processResult(data) {
  // the data object that comes back from the API can be visualised as a table in 'tidy'
  // format, C3.js wants the data round the other way, that is columns transposed to rows
  // So we need to drill down into the JSON object and grab the titles of the data series
  // the API calls them Columns
  var AQ_data_titles = data.AirQualityData.Columns.Column;
  // thendig the data section out
  var AQ_data = data.AirQualityData.RawAQData.Data;
  // console.log(AQ_data_titles);
  // console.log(AQ_data);
  // now lets try to draw the chart with these two data objects
  drawChart(AQ_data_titles,AQ_data);
}

function drawChart(data_titles, data_values) {

  // the data is an array of small objects
  // console.log(data_values);
  // console.log(data_titles);
  
  // now we have to process the title and data arrays into the form that C3 likes
  // C3 wants the data points in a single array for each series with the title of the
  // series in the first position in the array.
  // Thus we have to make an array for each line on the chart, lets put them all
  // into a single array where each element in the array is another array with a
  // complete data series in it, in effect its going to be a two dimensional array
  var all_series = [];
  // Now we have to dig out the
  for (var i =0; i < data_titles.length; i++) {
      // the column names have the site name at the start of them which makes them too long
      // for out legend on the chart, so lets chop that bit off the string
      var col_name = data_titles[i]['@ColumnName'];
      // find the semicolon position and add two, then use this number as the starting
      // point to chop out a sub string. Note that if substr() doesn't get a second argument
      // it keeps going till the end of the string, which is exactly what we want
      col_name = col_name.substr(col_name.indexOf(':')+2);
      all_series.push([col_name]);
  }
  // add the date series
  all_series.push(['days']);
  // console.log(all_series);

  // column names are in the same order as the data values
  for (var i =0; i < data_values.length; i++) {
      // all_series[i].push([data_values[i]['@ColumnName']]);
      // console.log(data_values[i]);
      all_series[0].push(data_values[i]['@Data1']);
      all_series[1].push(data_values[i]['@Data2']);
      all_series[2].push(data_values[i]['@Data3']);
      all_series[3].push(data_values[i]['@Data4']);
      all_series[4].push(data_values[i]['@Data5']);
      all_series[5].push(data_values[i]['@Data6']);
      all_series[6].push(data_values[i]['@MeasurementDateGMT']);
  } 


  var data1 = all_series[0];
  var data2 = all_series[1];
  var data3 = all_series[2];
  var data4 = all_series[3];
  var data5 = all_series[4];
  var data6 = all_series[5];
  var dates = all_series[6];
  // console.log(all_series[0])

  var chart = c3.generate({
      bindto: divID,
      data: {
        x:'days',
        columns: [dates,data1,data2,data4,data5,data6],
        xFormat: '%Y-%m-%d %H:%M'
      },
      legend: {
        position: 'inset'
      },
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        },
        y : {
          label: {
              text:'ug/m3',
              position: 'outer-middle'
          },
          tick: {
              format: d3.format(".3n")
  //                format: function (d) { return "$" + d; }
              }
          },
      }
  });

}

