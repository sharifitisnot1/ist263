var map;
var directionsService;
var directionsRenderer;

function initMap() {
    // Create a new map centered on the user's location
    navigator.geolocation.getCurrentPosition(function(position) {
        var origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map = new google.maps.Map(document.getElementById('map'), {
            center: origin,
            zoom: 15
        });

        // Create the directions service and renderer
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            panel: document.getElementById('directions')
        });

        // Get directions to the nearest bookstore
        var destination = '{{nearest_place_id}}';
        var request = {
            origin: origin,
            destination: {placeId: destination},
            travelMode: 'DRIVING'
        };
        directionsService.route(request, function(result, status) {
            if (status == 'OK') {
                directionsRenderer.setDirections(result);
            }
        });
    });
}
window.onload = function() {
    initMap();
};
