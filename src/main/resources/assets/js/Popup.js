/**
 * Created by ader_metria.se on 2017-03-11.
 */
/**
 * Elements that make up the popup.
 */
var container;
var content;
var closer;
var nextFeatureButton;
var previousFeatureButton;
var overlay;
var currentFeatures;
var map;
var featureLayer;
var page = 0;
var pages;
var aThis;
var Popup = {
    createPopup: function (theMap) {
        aThis = this;
        map = theMap;
        container = document.createElement('div');
        container.setAttribute('id','popup');
        content = document.createElement('div');
        content.setAttribute('id','popup-content');

        nextFeatureButton = document.createElement('div');
        nextFeatureButton.setAttribute('id','nextFeatureButton');
        nextFeatureButton.innerHTML = "❯";
        nextFeatureButton.onclick = function(){
            featureLayer.getSource().clear();
            if(page+1 >= currentFeatures.length){
                aThis.setFeature(currentFeatures[0]);
                page =0;
            } else {
                aThis.setFeature(currentFeatures[page+1]);
                page +=1;
            }
        };

        pages = document.createElement('div');
        pages.setAttribute('id','pages');

        previousFeatureButton = document.createElement('div');
        previousFeatureButton.setAttribute('id','previousFeatureButton');
        previousFeatureButton.innerHTML = "❮";
        previousFeatureButton.onclick = function(){
            featureLayer.getSource().clear();
            if(page-1 < 0){
                aThis.setFeature(currentFeatures[currentFeatures.length-1]);
                page = currentFeatures.length-1;
            } else {
                aThis.setFeature(currentFeatures[page-1]);
                page -=1;
            }

        };

        closer = document.createElement('div');
        closer.setAttribute('id','popup-closer');
        container.appendChild(content);
        container.appendChild(closer);
        container.appendChild(pages);
        container.appendChild(nextFeatureButton);
        container.appendChild(previousFeatureButton);
        closer.innerHTML= "✖";
        closer.onclick = function() {
            overlay.setPosition(null);
            closer.blur();
            featureLayer.getSource().clear();
        };
        overlay = new ol.Overlay(({
            element: container,
            autoPan: true,
            autoPanAnimation: {
            duration: 5
        }
        }));
        /*theMap.on('singleclick', function(evt) {
            var coordinate = evt.coordinate;
            content.innerHTML = '<p>You clicked here:</p><p>' + coordinate +
                '</p>';
            overlay.setPosition(coordinate);
        });*/
        theMap.addOverlay(overlay);
        return this;
    },
    getPopup: function(){
        return container;
    },
    getOverlay:function(){
        return overlay;
    },
    setPopupContent:function(newContent){
        content.innerHTML=newContent;
    },
    drawFeature: function(geometry){
        for(var i=0;i < map.getLayers().getArray().length;i++) {
            var layer = map.getLayers().getArray()[i];
            if(layer.get("name") == "featurelayer") {
                featureLayer = layer;
                break;
            }
        }
        featureLayer.getSource().clear();
        var feature = new ol.Feature();
        feature.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 0,255 , 0)'
            })
        }));
        feature.setGeometry(new ol.geom.Polygon(geometry.rings));
        featureLayer.getSource().addFeature(feature);
        map.addLayer(featureLayer);
    },
    setFeatures:function(features){
        page = 0;
        currentFeatures = features;
        this.setFeature(features[page]);
    },
    setFeature:function(feature){
        this.setPopupContent(this.getAttributesAsHTML(feature.attributes));
        this.drawFeature(feature.geometry);
        pages.innerHTML ="Sida:  "+(aThis.getFeatures().indexOf(feature)+1)+"/"+aThis.getFeatures().length;
    },
    getFeatures: function(){
        return currentFeatures;
    },
    getAttributesAsHTML:function(attributes){
        var html="";
        for(var key in attributes){
            if(key != "FID"){
                html +="<p><strong>"+key+":</strong> "+attributes[key]+"</p>";
            }
        }
        return html;
    }
};
