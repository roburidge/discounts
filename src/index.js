import { initMap, addMarker } from "./mapping";

const brighton = {
  lat: 50.83,
  lng: -0.14
};

const map = initMap({ center: brighton, zoom: 14 });

let venuesModel = null;

fetch("/api/discounts")
  .then(function(response) {
    // handle non 200 response status
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    }

    // response data!
    response
      .json()
      .then(parseData)
      .then(setupMapMarkers);
  })
  .catch(function(err) {
    console.log("Fetch Error:", err);
  });

// parse data from result
function parseData(discounts) {
  venuesModel = discounts;
  venuesModel.markerCollection = discounts.venues.map(venue => ({
    title: venue,
    position: {
      lat: brighton.lat + Math.random() / 50,
      lng: brighton.lng + Math.random() / 50
    }
  }));
}

// create markers
function setupMapMarkers() {
  venuesModel.markerCollection = venuesModel.markerCollection.map(marker => {
    const { position, title } = marker;
    const markerRef = addMarker({ position, title, map });
    return { ...marker, markerRef };
  });
  setupMarkerListeners();
}

// setup event listeners for markers
let infowindow = null;

function setupMarkerListeners() {
  venuesModel.markerCollection.forEach(markerModel => {
    google.maps.event.addListener(markerModel.markerRef, "click", () => {
      if (infowindow) {
        infowindow.close();
      }
      const contentString = JSON.stringify(markerModel.title);
      infowindow = new google.maps.InfoWindow({
        content: `<h2>${contentString}</h2>`
      });
      infowindow.open(map, markerModel.markerRef);
    });
  });
}
