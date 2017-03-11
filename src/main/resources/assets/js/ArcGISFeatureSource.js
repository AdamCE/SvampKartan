/**
 * Created by ader_metria.se on 2017-03-11.
 */


var ArcGISFeatureSource = {
    ArcGISFeatureSource: function (token, url, layer) {
        var esrijsonFormat = new ol.format.EsriJSON();
        var vectorSource = new ol.source.Vector({
            loader: function (extent, resolution, projection) {
                var url = serviceUrl + layer + '/query/?f=json&' +
                    'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
                    '{xmin:' + extent[0] + ',ymin:' + extent[1] + ',xmax:' + extent[2] + ',ymax:' + extent[3] +
                    ',spatialReference:{"wkid":3857}}' +
                    '&geometryType=esriGeometryEnvelope&inSR=3857&outFields=*' +
                    '&outSR=3857' + token;
                $.ajax({
                    url: url, dataType: 'jsonp', success: function (response) {
                        if (response.error) {
                            alert(response.error.message + '\n' +
                                response.error.details.join('\n'));
                        } else {
                            // dataProjection will be read from document
                            var features = esrijsonFormat.readFeatures(response, {
                                featureProjection: projection
                            });
                            if (features.length > 0) {
                                vectorSource.addFeatures(features);
                            }
                        }
                    }
                });
            },
            strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                tileSize: 512
            }))
        });
        var vector = new ol.layer.Vector({
            source: vectorSource
        });
        return vector;
    }
}