/**
 * Created by ader_metria.se on 2017-03-11.
 */
/**
 * Elements that make up the popup.
 */
var container;
var content;
var closer;
var Popup = {
    createPopup: function (theMap) {
        container = document.createElement('div');
        container.setAttribute('id','popup');
        content = document.createElement('div');
        content.setAttribute('id','popup-content');
        closer = document.createElement('div');
        closer.setAttribute('id','popup-closer');
        container.appendChild(content);
        container.appendChild(closer);
        closer.innerHTML= "✖";
        closer.onclick = function() {
            overlay.setPosition(null);
            closer.blur();
        };
        var overlay = new ol.Overlay(({
            element: container,
            autoPan: true,
            autoPanAnimation: {
            duration: 5
        }
        }));
        theMap.on('singleclick', function(evt) {
            var coordinate = evt.coordinate;
            content.innerHTML = '<p>You clicked here:</p><p>' + coordinate +
                '</p>';
            overlay.setPosition(coordinate);
        });
        theMap.addOverlay(overlay);
    },
    getPopup: function(){
        return container;
    }
};
