/**
 * Created by ader_metria.se on 2017-03-11.
 */
var ArcGISREST = {
    //http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/identify?geometryType=esriGeometryPoint&geometry={x: -120, y:40}&tolerance=10&mapExtent=-119,38,-121,41&imageDisplay=400,300,96&f=json
    identify: function(url,geometry,popup,token,layer,outFields){
        url = "https://services.arcgis.com/jO9a2B00pgSIna0g/arcgis/rest/services/Naturskydd/FeatureServer/"+layer;
        var request = url + "/query?geometryType=esriGeometryPoint&tolerance=10&f=json&returnGeometry=true&";
        var geom = "geometry={x:"+geometry[0]+",y:"+geometry[1]+"}";
        request += geom+"&";

        request += token+"&";

        request+= "outFields="+outFields;

        $.ajax({
            url: request, dataType: 'json', success: function (response) {
                popup.setPopupContent(response);
            }
        });
    }


};