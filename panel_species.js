/*

this file has one purpose, to draw some live data in a UIKit panel.

we specify which panel by specifying its ID in the marked variable below

the code asks a URL of a web service, in this case from the London air quality network
*/


// first we need to fetch the data, we can't draw anything until we have got some data
// from the service so we need to put all our chart code into a function which gets called
// once the request to the server has been completed.

var sitecode = 'LW2';
var URL = 'http://api.erg.kcl.ac.uk/AirQuality/Hourly/MonitoringIndex/SiteCode=' + sitecode + '/Json';

$.getJSON(URL, processResult);

function processResult(data) {
  var LA_data = data.HourlyAirQualityIndex.LocalAuthority;
  console.log(data);
  console.log(LA_data['@LocalAuthorityName']);
  console.log(LA_data.Site['@SiteName']);

  for (var i = 0; i < LA_data.Site.species.length; i++){
      drawPanel(LA_data.Site,i);
  }
  
}

function drawPanel(site_data, index) {
    var divTitle = '#panel-'+ (index + 1) +'-title';
    var divID = '.panel-'+ (index + 1)+'-indicators';
    // console.log(site_data.species[index]);
    // console.log(site_data.species[index]['@SpeciesName']);
    // console.log(site_data.species[index]['@SpeciesCode']);
    $(divTitle).append(site_data.species[index]['@SpeciesCode']);
    // console.log(site_data.species[index]['@AirQualityIndex']);
    // console.log(site_data.species[index]['@AirQualityBand']);
    $(divID).append(site_data.species[index]['@AirQualityBand']);
    if (site_data.species[index]['@AirQualityBand'] == "Low") {
      // make it green
      $(divID).addClass('uk-text-success');
    } else {
      $(divID).addClass('uk-text-warning');
    }  
}





