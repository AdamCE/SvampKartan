/**
 * Created by ader_metria.se on 2017-03-11.
 */


var ArcGISFeatureSource = {
    ArcGISFeatureSource: function (token, url, layer) {
        var servUrl = url;
        var esrijsonFormat = new ol.format.EsriJSON();
        var vectorSource = new ol.source.Vector({
            loader: function (extent, resolution, projection) {
                var url = servUrl + layer + '/query/?f=json&' +
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
                                $.ajax({url:servUrl+layer+"?f=json"+ token, dataType: 'json',success:function (response){
                                    var arrayOfStyles = {};
                                    var drawingInfo = response.drawingInfo.renderer.uniqueValueInfos;
                                    var isPoint = false;
                                    if(response.drawingInfo.renderer.uniqueValueInfos != null){
                                        var field = response.drawingInfo.renderer.field1;
                                        for(var j=0;j < drawingInfo.length;j++){
                                            var aNewStyle;
                                            var label = drawingInfo[j].label;
                                            var outlinewidth = drawingInfo[j].symbol.outline.width;
                                            var colorArr = drawingInfo[j].symbol.outline.color;
                                            var outlinecolor = 'rgba('+colorArr[0]+', '+colorArr[1]+','+colorArr[2]+' , '+colorArr[3]+')';
                                            aNewStyle = new ol.style.Style({
                                                stroke: new ol.style.Stroke({
                                                    color: outlinecolor,
                                                    width: outlinewidth
                                                })});
                                            arrayOfStyles[label]=aNewStyle;
                                        }
                                    } else{
                                        var colorArr = response.drawingInfo.renderer.symbol.color;
                                        var outlinecolor = 'rgba('+colorArr[0]+', '+colorArr[1]+','+colorArr[2]+' , '+colorArr[3]+')';
                                        aNewStyle = new ol.style.Style({
                                            image: new ol.style.Circle({
                                                radius: 8,
                                                fill: new ol.style.Fill({
                                                    color: outlinecolor
                                                }),
                                                stroke: new ol.style.Stroke({
                                                    color: outlinecolor,
                                                    width: 3
                                                })
                                            })});
                                        arrayOfStyles = aNewStyle;
                                        isPoint = true;
                                    }
                                    if(isPoint){
                                        for(var x = 0;x < features.length;x++){
                                            features[x].setStyle(arrayOfStyles);
                                        }
                                    } else {
                                        for(var x = 0;x < features.length;x++){
                                            features[x].setStyle(arrayOfStyles[features[x].getProperties()[field]]);
                                        }
                                    }
                                    vectorSource.addFeatures(features);
                                }});

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