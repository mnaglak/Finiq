
var hash = window.location.hash.substr(1);

  


//Define map start up options
var mapOptions = {
 tap: false,
 center: [39.91381644734087, 20.055112781752946], //set center Lat/Long of your area of interest
 zoom: 16, //set initial zoom level
 maxZoom : 20,  //set max zoom level
 minZoom : 14,
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
//var placeMarkers = new Array();

var mapWidth = map.getSize().x;
var popUpWidth = mapWidth * 0.8;


//Example of an externally called basemap
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxNativeZoom: 17,
            maxZoom: 20,
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'});



var placesImported = L.geoJSON(places, {
        onEachFeature: popUpPlaces
});

var placesALImported = L.geoJSON(placesAL, {
        onEachFeature: popUpPlaces
});

var entranceImported = L.geoJSON(entrance, {
    onEachFeature: popUpEntrance
});

var pathsImported = L.geoJSON(paths, {
    style: {
        //color: "#D38715",
        color: "silver",
        weight: 5,
        opacity: 1,
        fillOpacity: .8,
        dashArray: '8, 6'
    }
    });

var houseImported = L.geoJSON(houseOfTwoPeristyles, {
    style: {
        color: "#4B4B4B",
        opacity: 1,
        fillOpacity: .7
    }
    });

var wallsImported = L.geoJSON(walls, {
    style: {
        color: "black",
        opacity: 0.5,
        fillOpacity: 0
    
    }
});

var streetsImported = L.geoJSON(streets, {
    style: {
        color: "grey",
        opacity: 0.8,
        fillOpacity: 0

    }
});

var infoIcon = L.icon({
    iconUrl: 'info.png',
    //shadowUrl: 'info.png',

    iconSize: [150, 50], // size of the icon
    //shadowSize: [50, 64], // size of the shadow
    iconAnchor: [0, 25], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [75, -25] // point from which the popup should open relative to the iconAnchor
});
 
var entrancePopup = "<center><b>Ancient Finiq</b></center><br>A paragraph of information giving an overview of the city";
var entrancePopupAL = "<center><b>Ancient Finiq</b></center><br>Some text in Albanian";
    

Esri_WorldImagery.addTo(map);
map.addLayer(placesImported);
map.addLayer(houseImported);
map.addLayer(wallsImported);
map.addLayer(streetsImported);
map.addLayer(pathsImported);
entranceMarker = new L.Marker([39.91351259783837, 20.059624328713472], { icon: infoIcon }).bindPopup(entrancePopup, { maxHeight: 200, maxWidth: 200, closeOnClick: true }).addTo(map);

var english = true;
var entranceMarkerAL;
function changeLanguage(lang) {
    if (lang == "en") {
        map.removeLayer(placesALImported);
        map.addLayer(placesImported);
        map.removeLayer(entranceMarkerAL);
        entranceMarker = new L.Marker([39.91351259783837, 20.059624328713472], { icon: infoIcon }).bindPopup(entrancePopup, { maxHeight: 200, maxWidth: 200, closeOnClick: true }).addTo(map);
        english = true;
    }
    if (lang == "al") {
        map.removeLayer(placesImported);
        map.addLayer(placesALImported);
        map.removeLayer(entranceMarker);
        entranceMarkerAL = new L.Marker([39.91351259783837, 20.059624328713472], { icon: infoIcon }).bindPopup(entrancePopupAL, { maxHeight: 200, maxWidth: 200, closeOnClick: true }).addTo(map);
        english = false;
    }
}





//Create popUp box function

    


    function popUpPlaces(f,l) {
        var out = [];
        //var mapWidth = map.getSize().x;
        //var popUpWidth = mapWidth * 0.8;
        if (f.properties) {
            out.push('<b>Name: </b>' + f.properties.Name);
            out.push('<br><b>Date: </b>' + f.properties.Date);
            out.push('<br><b>Description: </b>' + f.properties.Descriptio);
            out.push('<br><b>More Information: </b>' + f.properties.More);
            out.push('<br><b>Historical Context: </b>' + f.properties.Hist);
            out.push('<br><b>3D model: </b>' + '<a href="' + sfLink + '"target="_blank">Visit Sketchfab</a>');
            out.push('<br><b>Select Bibliography: </b>' + f.properties.Bibliography);
            l.bindPopup(out.join("<br />"), {maxHeight: 200, maxWidth: popUpWidth, closeOnClick: true});
        }
    }

function popUpEntrance(f, l) {
    var out = [];
    var mapWidth = map.getSize().x;
    var popUpWidth = mapWidth * 0.8;
    if (f.properties) {
        out.push('<center><b>Ancient Finiq</b></center>');
        out.push('Overview of ancient Finiq....');
        l.bindPopup(out.join("<br />"), { maxHeight: 200, maxWidth: popUpWidth, closeOnClick: true });
    }
}

//Create Control Box for turning on and off layers
    var baseLayers = {
        "Satellite Imagery" : Esri_WorldImagery
    };

    var clusterLayers = {
        //"Information Points" : placesImported,
         "Walking Path" : pathsImported,
        "Ancient Buildings": houseImported,
        "Ancient Walls": wallsImported,
        "Ancient Streets": streetsImported
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


//CAN BE COMBINED WITH FUNCTION ABOVE????
map.on('popupopen', function(event) {  
    var popup = event.popup;
    var mapWidth = map.getSize().x;
    var popUpWidth = mapWidth * 0.8;
    popup.options.maxWidth = popUpWidth;
    popup.update();
});
    

map.whenReady(function(){
console.log(placesImported);

if (hash == "0")
{
    placesImported._layers[28].openPopup();
}

    
});


// placeholders for the L.marker and L.circle representing user's current position  
//var current_position

//function onLocationFound(e) {
//    // if position defined, then remove the existing position circle from the map
//    if (current_position) {
//        map.removeLayer(current_position);
//    }

//    current_position = L.circle(e.latlng, 10).addTo(map);
//    current_position.bindTooltip("Your location", { permanent: true, direction: "bottom" })


//  }

//  function onLocationError(e) {
//      alert(e.message);
//  }

//  map.on('locationfound', onLocationFound);
//  map.on('locationerror', onLocationError);

//map.locate({ setView: false, watch: true });

