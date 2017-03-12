/**
 * Created by ader_metria.se on 2017-03-11.
 */
var ArcGISREST = {
    //http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/identify?geometryType=esriGeometryPoint&geometry={x: -120, y:40}&tolerance=10&mapExtent=-119,38,-121,41&imageDisplay=400,300,96&f=json
    identify: function(url,geometry,popup,token,layer,outFields){
        url = "https://services.arcgis.com/jO9a2B00pgSIna0g/arcgis/rest/services/Naturskydd/FeatureServer/"+layer;
        var url2 = "https://services.arcgis.com/jO9a2B00pgSIna0g/arcgis/rest/services/Svamphabitat/FeatureServer/";
        var request =  "/query?geometryType=esriGeometryPoint&f=json&returnGeometry=true&";
        var geom = "geometry={x:"+geometry[0]+",y:"+geometry[1]+"}";
        request += geom+"&";

        request += token+"&";

        request+= "outFields=*";
        var distance = "&distance="+15*map.getView().getZoom();
        var features = [];
        $.ajax({
            url: url +request, dataType: 'json', success: function (response) {
                //popup.setFeatures(response.features);
                //popup.getOverlay().setPosition(geometry);
                features = features.concat(response.features);
                $.ajax({url:url2+"0"+request+distance, dataType: 'json', success: function (response) {
                    features = features.concat(response.features);
                    $.ajax({url:url2+"1"+request+distance, dataType: 'json', success: function (response) {
                        features = features.concat(response.features);
                        $.ajax({url:url2+"2"+request+distance, dataType: 'json', success: function (response) {
                            features = features.concat(response.features);
                            $.ajax({url:url2+"3"+request+distance, dataType: 'json', success: function (response) {
                                features = features.concat(response.features);
                                popup.setFeatures(features);
                                popup.getOverlay().setPosition(geometry);
                            }});
                        }});
                    }});
                }});
            }
        });
    }


};