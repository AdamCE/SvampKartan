/**
 * Created by ader_metria.se on 2017-03-11.
 */

function createMap(mapDiv) {

    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: mapDiv,
        view: new ol.View({
            center: ol.proj.fromLonLat([-0.12755, 51.507222]),
            zoom: 6
        })
    });
    map.getControls().clear();
}

function createControl(divName) {

}