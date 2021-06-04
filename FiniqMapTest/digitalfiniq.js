

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
        [39.90844802793145, 20.03472901279505],
        //north east
        [39.92151290986558, 20.079004232431558]
        ],
 }

var sfLink = 'https://sketchfab.com/3d-models/archaeology-in-action-546273d5fd4b4625ad61f8837c9fcfc2';

//Creates map object according to map options
var map = new L.map('map', mapOptions);

//Example of an externally called basemap
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'});

var infoPointsImported = L.geoJSON(infoPoints, {
        onEachFeature: popUpInfo
    });

var placesImported = L.geoJSON(places, {
        onEachFeature: popUpPlaces
    });
 
var pathsImported = L.geoJSON(paths);
var houseImported = L.geoJSON(houseOfTwoPeristyles);
   

Esri_WorldImagery.addTo(map);
map.addLayer(infoPointsImported);
map.addLayer(placesImported);
pathsImported.addTo(map);
map.addLayer(houseImported);




//Create popUp box function
    function popUpInfo(f,l) {
        var out = [];
        if (f.properties) {
            out.push('<b>Name: </b>' + f.properties.Name);
            out.push('<br><b>Description: </b>' + f.properties.description);
            l.bindPopup(out.join("<br />"));
        }
    }

    function popUpPlaces(f,l) {
        var out = [];
        if (f.properties) {
            out.push('<b>Name: </b>' + f.properties.Name);
            out.push('<br><b>Type: </b>' + f.properties.Type);
            out.push('<br><b>Description: </b>' + f.properties.description);
            out.push('<br><b>Date Built: </b>' + f.properties.Date_built);
            out.push('<br><b>Research: </b>' + f.properties.Research);
            out.push('<br><b>3D model: </b>' + '<a href="' + sfLink + '"target="_blank">Visit Sketchfab</a>');
            out.push('<br><b>Bibliography: </b>' + f.properties.Bibliography);
            l.bindPopup(out.join("<br />"), {maxHeight: 200, maxWidth: 300, closeOnClick: true});
        }
    }

//Create Control Box for turning on and off layers
    var baseLayers = {
        "Satellite Imagery" : Esri_WorldImagery
    };

    var clusterLayers = {
        "Places" : placesImported,
        "Info Points" : infoPointsImported,
        "House of the Two Peristyles" : houseImported
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

map.whenReady(function(){
    console.log('Map Loaded!');
    console.log(hash);

});

if (hash == "0")
{
clusterLayers.Places._layers[32].openPopup();
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
