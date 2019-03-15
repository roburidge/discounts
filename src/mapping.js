function initMap(options) {
  const map = new google.maps.Map(document.getElementById("map"), options);

  return map;
}

function addMarker({ position, map, title }) {
  const marker = new google.maps.Marker({ position, map, title });

  return marker;
}

export { initMap, addMarker };
