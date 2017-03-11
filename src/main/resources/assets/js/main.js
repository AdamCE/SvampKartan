var serviceUrl = 'https://services.arcgis.com/jO9a2B00pgSIna0g/arcgis/rest/services/Naturskydd/FeatureServer/';
var layer = "0";
var token = "&token=g8dH8LIMvidj4i3fTlmsmoC8lAhY6deGCu8HdhijKxVBVbhvYzrtyKlvUlY476SH0071ODAX_DfaKUD0GdYc8xr-AUl2q_UCtiz1RKRK5T9pUEJof-EOIdFbX8bQsFn4lYK-I9sDcySjqf37rWjmx1N1RbK63DXza09CMfEWNnrRAQPQGrSF1jnZRNf7VfO7V927O5juK94pbE3RXAVE4_BoiX6D9YquHJoC6UEncl4";

function createMap(mapDiv) {
    var vector = ArcGISFeatureSource.ArcGISFeatureSource(token,serviceUrl,"0");
    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vector
        ],
        target: mapDiv,
        view: new ol.View({
            center: ol.proj.fromLonLat([18.068580800000063,59.32932349999999]),
            zoom: 10
        })
    });
    initGps(map);
    map.getControls().clear();
    return map;
}

function initGps(map) {
    var geolocation = new ol.Geolocation({
        projection: map.getView().getProjection(),
        tracking: true,
        trackingOptions: {
            enableHighAccuracy: true,
            maximumAge: 2000
        }
    });

    var positionFeature = new ol.Feature();
    positionFeature.setStyle(new ol.style.Style({
        image: new ol.style.Circle({
            radius: 8,
            fill: new ol.style.Fill({
                color: '#3399CC'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 3
            })
        })
    }));
    new ol.layer.Vector({
        map: map,
        source: new ol.source.Vector({
            features: [positionFeature]
        })
    });

    geolocation.on('change:position', function(event) {
        console.log(event);
        var coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ?
          new ol.geom.Point(coordinates) : null);
    });
}