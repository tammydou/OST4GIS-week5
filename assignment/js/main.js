/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);



/* =====================
 Create new variable to store original data and input form
===================== */

var crimedata = {
  "markers":undefined,
  "data":undefined,
  "URL":undefined,
  "Lng":undefined,
  "Lat":undefined,
};


$(document).ready(function(){
  /* =====================
   Create input text
  ===================== */
  $("#main-heading").text('Philadelphia crime snippet');
  $("#text-label1").text('Data URL');
  $("#text-label2").text('Lat');
  $("#text-label3").text('Lng');
  /* =====================
   Set default value to input form
  ===================== */
  $("#text-input1").val("https://raw.githubusercontent.com/CPLN-692-401/datasets/master/json/philadelphia-crime-snippet.json");
  $("#text-input2").val("Lat");
  $("#text-input3").val("Lng");
  /* =====================
   Enable input form
  ===================== */
  $("#text-input1").prop("disabled", false);
  $("#text-input2").prop("disabled", false);
  $("#text-input3").prop("disabled", false);
  /* =====================
   Use functions created in Week4->Lab2->Part2
  ===================== */
  var downloadData = $.ajax("https://raw.githubusercontent.com/CPLN-692-401/datasets/master/json/philadelphia-crime-snippet.json");

  var parseData = function(response) {return JSON.parse(response);};

  var makeMarkers = function(markers){
    return _.map(markers, function(mar){return L.marker([mar[crimedata.Lat],mar[crimedata.Lng]]);});
  };

  var plotMarkers = function(marker) {
    return _.map (marker, function(m){
      return m.addTo(map);}
    );
  };

  var removeMarkers = function(marker) {
    _.each(marker,function(m){
      map.removeLayer(marker);
    });
  };
  /* =====================
   Initiate button
  ===================== */
  $('#mybutton').click(function(e){
    crimedata.URL = $("#text-input1").val();
    console.log("URL", crimedata.URL);
    crimedata.Lat = $("#text-input2").val();
    console.log("Lat", crimedata.Lat);
    crimedata.Lng = $("#text-input3").val();
    console.log("Lng", crimedata.Lng);
    // removeMarkers(crimedata.markers);

    var newdata = $.ajax(crimedata.URL);

    newdata.done(function(data) {
      var parsed = parseData(data);
      console.log(parsed);
      var markers = makeMarkers(parsed);
      crimedata.markers=markers;
      console.log(markers);
      plotMarkers(markers);
      console.log("Attaching " + markers.length + " markers to the map");
    });

  });
});
