

var hash = window.location.hash.substr(1);

//Define map start up options
var mapOptions = {
 tap: false,
 center: [39.91381644734087, 20.055112781752946], //set center Lat/Long of your area of interest
 zoom: 16, //set initial zoom level
 maxZoom : 18,  //set max zoom level
 minZoom : 15,
 maxBounds: [
        //south west
        [39.89647938421925, 20.025306003120978],
        //north east
        [39.928943892224005, 20.096501788379104]
        ],
 }

var sfLink = 'https://sketchfab.com/3d-models/archaeology-in-action-546273d5fd4b4625ad61f8837c9fcfc2';

//Creates map object according to map options
var map = new L.map('map', mapOptions);

//Example of an externally called basemap
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'});


var placesImported = L.geoJSON(places, {
        onEachFeature: popUpPlaces
    });
 
var pathsImported = L.geoJSON(paths);
var houseImported = L.geoJSON(houseOfTwoPeristyles);
   

Esri_WorldImagery.addTo(map);
map.addLayer(placesImported);
map.addLayer(pathsImported);
map.addLayer(houseImported);




//Create popUp box function

       function popUpPlaces(f,l) {
        var out = [];
        //console.log(out);
        var mapWidth = map.getSize().x;
        var popUpWidth = mapWidth * 0.8;
        //console.log("map width = " + mapWidth);
        if (f.properties) {
            out.push('<b>Name: </b>' + f.properties.Name);
            out.push('<br><b>Date: </b>' + f.properties.Date);
            out.push('<br><b>Description: </b>' + f.properties.Description);
            out.push('<br><b>More Information: </b>' + f.properties.More);
            out.push('<br><b>Historical Context: </b>' + f.properties.Hist);
            out.push('<br><b>3D model: </b>' + '<a href="' + sfLink + '"target="_blank">Visit Sketchfab</a>');
            out.push('<br><b>Bibliography: </b>' + f.properties.Bibliography);
            l.bindPopup(out.join("<br />"), {maxHeight: 200, maxWidth: popUpWidth, closeOnClick: true});
        }
    }

//Create Control Box for turning on and off layers
    var baseLayers = {
        "Satellite Imagery" : Esri_WorldImagery
    };

    var clusterLayers = {
        "Information Points" : placesImported,
         "Walking Path" : pathsImported,
        "Ancient Buildings" : houseImported
    };


  var controls =  L.control.layers(baseLayers, clusterLayers).addTo(map);

map.on('popupopen', function(e){
    map.dragging.disable()
    map.removeControl(controls);
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.zoomControl.remove();
});

map.on('popupclose', function(e){
    map.dragging.enable();
    map.addControl(controls);
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    map.zoomControl.addTo(map);
});

map.on('resize', function(e){
map.closePopup();

});

map.on('popupopen', function(event) {  
    var popup = event.popup;
    var mapWidth = map.getSize().x;
    var popUpWidth = mapWidth * 0.8;
    popup.options.maxWidth = popUpWidth;
    popup.update();
    
});

map.whenReady(function(){
console.log(hash);
console.log(clusterLayers.Places);


});

if (hash == "0")
{
clusterLayers.Places._layers[28].openPopup();
}

// 	function onLocationFound(e) {
// 		var radius = e.accuracy / 2;

// 		L.marker(e.latlng).addTo(map)
// 			.bindPopup("You are within " + radius + " meters from this point").openPopup();

// 		L.circle(e.latlng, radius).addTo(map);
// 	}

// 	function onLocationError(e) {
// 		alert(e.message);
// 	}

// 	map.on('locationfound', onLocationFound);
// 	map.on('locationerror', onLocationError);

// 	map.locate({setView: true, maxZoom: 16});
