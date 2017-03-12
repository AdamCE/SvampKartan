/**
 * Created by ader_metria.se on 2017-03-12.
 */
var swapped = false;
var BaseMapSwitcher = {


    createBaseMapSwitchButton: function(map,basemap1,basemap2){
        var button = document.createElement("div");
        button.setAttribute("id","basemapswitcher");
        button.className="basemapswitcher";
        button.onclick = function(){
                if(swapped){
                    map.removeLayer(basemap2);
                    map.addLayer(basemap1);
                    button.className="basemapswitcher";
                    swapped = false;
                } else {
                    map.removeLayer(basemap1);
                    map.addLayer(basemap2);
                    button.className="basemapswitcher2";
                    swapped = true;
                }
        };

        var control = new ol.control.Control(
            {
                element: button
            });
       return control;
    }
};