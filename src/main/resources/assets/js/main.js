var serviceUrl = 'https://services.arcgis.com/jO9a2B00pgSIna0g/arcgis/rest/services/Naturskydd/FeatureServer/';
var layer = "0";
var token = "&token=g8dH8LIMvidj4i3fTlmsmoC8lAhY6deGCu8HdhijKxVBVbhvYzrtyKlvUlY476SH0071ODAX_DfaKUD0GdYc8xr-AUl2q_UCtiz1RKRK5T9pUEJof-EOIdFbX8bQsFn4lYK-I9sDcySjqf37rWjmx1N1RbK63DXza09CMfEWNnrRAQPQGrSF1jnZRNf7VfO7V927O5juK94pbE3RXAVE4_BoiX6D9YquHJoC6UEncl4";
var geolocation;

function createMap(mapDiv) {
    var featurelayer = new ol.layer.Vector({
        name:"featurelayer",
        source: new ol.source.Vector({
            features: []
        })
    });
    var vector = ArcGISFeatureSource.ArcGISFeatureSource(token,serviceUrl,"0");

    var view = new ol.View({
        center: [0, 0],
        zoom: 10
    });

    var map = new ol.Map({
        layers: [featurelayer,
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vector
        ],
        target: mapDiv,
        view: view
    });
    initGps(map);

    geolocation.once('change:position', function() {
        var coords = geolocation.getPosition();
        view.setCenter(coords);
        view.setResolution(200);
        map.addControl(Weather.createWeather(coords));
    });

    map.getControls().clear();

    return map;
}

function initGps(map) {
    geolocation = new ol.Geolocation({
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

    geolocation.on('change:position', function() {
        var coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ?
          new ol.geom.Point(coordinates) : null);

        var lonlat = ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');

        var request = "https://api.resrobot.se/v2/location.nearbystops?key=5640c8c2-224d-4225-9040-8047dece61fa&originCoordLat="
        + lonlat[1] + "&originCoordLong="
        + lonlat[0] + "&format=json";

        $.ajax({
            url: request, dataType: 'json', success: function (response) {
                var points = [];
                response.StopLocation.forEach(function (item) {
                    var stop = new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.transform([item.lon, item.lat], 'EPSG:4326',
                          'EPSG:3857')),
                        name: item.name
                    });
                    points.push(stop);
                });
                console.log(points);

                var iconStyle = new ol.style.Style({
                    image: new ol.style.Icon(({
                        anchor: [0.5, 46],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        opacity: 0.75,
                        src: 'usefravatar.png'
                    }))
                });

                var vectorSource = new ol.source.Vector({
                    features: points //add an array of features
                });

                var vectorLayer = new ol.layer.Vector({
                    map: map,
                    source: vectorSource,
                    style: iconStyle
                });
            }
        });
    });
}