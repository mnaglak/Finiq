
var hash = window.location.hash.substr(1);

  


//Define map start up options
var mapOptions = {
 tap: false,
 center: [39.91381644734087, 20.055112781752946], //set center Lat/Long of your area of interest
 zoom: 16, //set initial zoom level
 maxZoom : 20,  //set max zoom level
 minZoom: 10,
 touchZoom: true,
 maxBounds: [
        //south west
     [39.690784799474905, 19.81299812520738],
        //north east
     [40.098806006678494, 20.262505016975012]
        ],
 }

var sfLink = 'https://sketchfab.com/3d-models/archaeology-in-action-546273d5fd4b4625ad61f8837c9fcfc2';

//Creates map object according to map options
var map = new L.map('map', mapOptions);
//var placeMarkers = new Array();

var mapWidth = map.getSize().x;
var mapHeight = map.getSize().y;
var popUpWidth = mapWidth * 0.8;
var popUpHeight = mapHeight * 0.6;
var imageWidth = popUpWidth * 0.8;
var imageHeight = imageWidth * 0.6;
var images = [null, "image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png", "image8.png", "image9.png"];
var currentImage = null;



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
        color: "orange",
        weight: 4,
        opacity: .3
    }
    });

var houseImported = L.geoJSON(houseOfTwoPeristyles, {
    style: {
        weight: 1,
        color: "black",
        opacity: .5,
        fillOpacity: .3
    }
    });

var wallsImported = L.geoJSON(walls, {
    style: {
        weight: 3,
        color: "black",
        opacity: 0.8,
    }
});

var streetsImported = L.geoJSON(streets, {
    style: {
        weight: 2,
        color: "white",
        opacity: 0.3,
        dashArray: '12'
    }
});



var infoIcon = L.icon({
    iconUrl: 'info.png',
    //shadowUrl: 'info.png',

    iconSize: [150, 75], // size of the icon
    iconAnchor: [75, 100], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
});

var entrancePopup = "<center><b>Ancient Phoenike</b></center><br>The settlement of ancient Phoenike was one of the largest communities in the region of Epirus during the Hellenistic period and was the capital of Chaonia, one of the fourteen Epirote tribal. While evidence from the 5th and 4th centuries BCE point to the settlement’s earliest origins, its true urban development dates primarily to the 3rd century BCE, culminating in the city becoming capital of the Epirote League. During the Third Macedonian War, the region of Chaonia supported the Roman Republic, resulting in Phoenike being spared from Roman destruction when the war ended in 168 BCE. As a Roman community, Phoenike lasted for several centuries and experienced an important phase under the Byzantine Emperor Justinian during the 6th century CE. During this period, Phoenike became a vescoval see and featured a variety of early Christian religious buildings.<br><br>First excavated by Luigi Maria Ugolini in the 1920s and more recently by the Italian Archaeological Mission, the history of Phoenike continues to be written as archaeologists peel back its layers year - by - year.This interactive map tells the story of the most important archaeological discoveries over the past century, including grand public buildings, monumental defensive structures, fascinating private residences, and a multilayered burial ground which served as the final resting place for centuries of generations of the settlement’s inhabitants.Within the map, occasional links to 3D content help bring this story to life and illustrate the reconstructions imagined by archaeologists who have excavated and studied this site.<br><br>Enjoy your exploration of ancient Phoenike!<br><br><i>Designed and created by <b>Sabian Hasani and Tyler Duane Johnson</b> with the support of the <b>Albanian Ministry of Culture</b> and the <b>Italian-Albanian Archaeological Mission at Phoinike</b></i><br><br> ";
var entrancePopupAL = "<center><b>Ancient Finiq</b></center><br>ALBANIAN The settlement of ancient Finiq was one of the largest communities in the region of Epirus during the Hellenistic period and was the capital of Chaonia, one of the fourteen Epirote tribal. While evidence from the 5th and 4th centuries BCE point to the settlement’s earliest origins, its true urban development dates primarily to the 3rd century BCE, culminating in the city becoming capital of the Epirote League. During the Third Macedonian War, the region of Chaonia supported the Roman Republic, resulting in Finiq being spared from Roman destruction when the war ended in 168 BCE. As a Roman community, Finiq lasted for several centuries and experienced an important phase under the Byzantine Emperor Justinian during the 6th century CE. During this period, Finiq became a vescoval see and featured a variety of early Christian religious buildings.<br><br>First excavated by Luigi Maria Ugolini in the 1920s and more recently by the Italian Archaeological Mission, the history of Finiq continues to be written as archaeologists peel back its layers year - by - year.This interactive map tells the story of the most important archaeological discoveries over the past century, including grand public buildings, monumental defensive structures, fascinating private residences, and a multilayered burial ground which served as the final resting place for centuries of generations of the settlement’s inhabitants.Within the map, occasional links to 3D content help bring this story to life and illustrate the reconstructions imagined by archaeologists who have excavated and studied this site.<br><br>Enjoy your exploration of ancient Finiq!";;
    

Esri_WorldImagery.addTo(map);
map.addLayer(placesImported);
map.addLayer(wallsImported);


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
        var myImage;
        var myImageW = imageWidth;
        var myImageH = imageHeight;
        if (f.properties) {
            out.push('<b><u>' + f.properties.Name + '</u></b>');
            out.push('<br><b>Date: </b>' + f.properties.Date);
            if (f.properties.ThreeD) {
                out.push('<br><b>3D model: </b>' + '<a href="' + f.properties.ThreeD + '"target="_blank">Visit Sketchfab</a>');
            }
            out.push('<br><b>Description: </b>' + f.properties.Descriptio + '<br><center>');
            //if (f.properties.image)
            //{
            //    console.log(myImageW);
            //    myImage = images[f.properties.image];
            //    out.push('<br><center><img src ="' + myImage + '" width ="' + myImageW + '" height ="' + myImageH + '" > <br>' + f.properties.caption + '</center>');      
            //}

            l.bindPopup(out.join("<br/>"), { maxHeight: popUpHeight, maxWidth: popUpWidth, closeOnClick: true });
           
            
        }
    }


function popUpEntrance(f, l) {
    var out = [];
    if (f.properties) {
        out.push('<center><b>Ancient Finiq</b></center>');
        out.push('Overview of ancient Finiq....');
        l.bindPopup(out.join("<br/>"), { maxHeight: popUpHeight, maxWidth: popUpWidth, closeOnClick: true });
    }
}

//Create Control Box for turning on and off layers
    var baseLayers = {
        "Satellite Imagery" : Esri_WorldImagery
    };

    var clusterLayers = {
        "Walking Path": pathsImported,
        "Ancient Walls": wallsImported,
        "Ancient Buildings": houseImported,
        "Ancient Streets": streetsImported
    };


  var controls =  L.control.layers(baseLayers, clusterLayers).addTo(map);



map.on('popupclose', function(e){
    map.dragging.enable();
    map.addControl(controls);
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    map.zoomControl.addTo(map);
    map.setMaxBounds([
        //south west
        [39.690784799474905, 19.81299812520738],
        //north east
        [40.098806006678494, 20.262505016975012]
    ]);
    

});


map.on('resize', function(e){
    map.closePopup();
    resized = true;
});



map.on('popupopen', function (event) {
    map.dragging.disable()
    map.removeControl(controls);
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.zoomControl.remove();
    map.setMaxBounds([
        //south west
        [37.17168400781412, 14.555219061565039],
        //north east
        [44.937766393643194, 24.445555079300775]
    ]);

    var popup = event.popup;
    var marker = popup._source;
    var content = popup.getContent();
    var oldImageStart = content.indexOf('<c');
    var originalContent = content.substring(0, oldImageStart);

  
    mapWidth = map.getSize().x;
    mapHeight = map.getSize().y;
    popUpWidth = mapWidth * 0.8;
    popUpHeight = mapHeight * 0.6;
    imageWidth = popUpWidth * 0.8;
    imageHeight = imageWidth * 0.6;
    logoWidth = popUpWidth * 0.6;
    logoHeight = logoWidth / 3;
    popup.options.maxWidth = popUpWidth;
    popup.options.maxHeight = popUpHeight;
    popup.update();

    if (marker != entranceMarker && marker != entranceMarkerAL) {
        var imageUpdate = images[marker.feature.properties.image];
        var captionUpdate = marker.feature.properties.caption;
        var imageHTML = '<center><br><img src ="' + imageUpdate + '" width ="' + imageWidth + '" height ="' + imageHeight + '" border = 2px solid white> <br>' + captionUpdate + '</center>'
        marker._popup.setContent(originalContent + imageHTML);
    }

    if (marker == entranceMarker || marker == entranceMarkerAL) {
    
        var logoUpdate = "<center><img src = ministry_logo.png height ='" + logoHeight + "'width ='" + logoWidth + "' border = 2px solid white></center>"

        if (english == true) {
            marker._popup.setContent(entrancePopup + logoUpdate);
        }
        else {
            marker._popup.setContent(entrancePopupAL + logoUpdate);
        }

       
    }


   
   
    


    //console.log(feature);
    //layer.unbindPopup(popup);
    //popUpPlaces(feature, layer);


    });

    


map.whenReady(function(){
//console.log(placesImported);

if (hash == "0")
{
    placesImported._layers[28].openPopup();
}

  

    
});


// placeholders for the L.marker and L.circle representing user's current position

var current_position
var needToNotify = true;

function onLocationFound(e) {

    if (map.getBounds().contains(e.latlng)) {
        // if position defined, then remove the existing position circle from the map
        if (current_position) {
            map.removeLayer(current_position);
        }

        current_position = L.circle(e.latlng, 5).addTo(map);
        current_position.bindTooltip("Your location", { permanent: true, direction: "bottom" })
    }
    else {
        if (needToNotify == true) {
            alert("It looks like you are far away from Phoenike, so your position will not appear on the map.");
            needToNotify = false;
        }
        
    }


  }

  function onLocationError(e) {
      alert("Please update your device's settings to allow location services and refresh the page if you would like to see your live position.");
  }

  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);

map.locate({ setView: false, watch: true });


//var customControl = L.Control.extend({
//    options: {
//        position: 'bottomleft'
//    },

//    onAdd: function (map) {
//        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

//        container.style.backgroundColor = 'white';
//        container.style.backgroundImage = "url(http://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
//        container.style.backgroundSize = "30px 30px";
//        container.style.width = '30px';
//        container.style.height = '30px';

//        container.onclick = function () {
//            console.log('buttonClicked');
//        }

//        return container;
//    }
//});

//map.addControl(new customControl());
