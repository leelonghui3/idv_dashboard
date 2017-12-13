/*

will visualise the weather in a panel
will get a cross orgin request error if its not on the server

*/

var URL = 'http://api.openweathermap.org/data/2.5/forecast/city?id=3333166&APPID=9bb3595ea8a97029639704c7d9ce56a0'
var base = 'http://api.openweathermap.org/data/2.5/';
var endpoint = 'weather?q=';
var value = 'London,uk';
var api_key = '&APIID=9bb3595ea8a97029639704c7d9ce56a0';
var url = base + endpoint + value + api_key ;

function processResult(data) {
   console.log(data);
}

$.getJSON(URL, processResult);
