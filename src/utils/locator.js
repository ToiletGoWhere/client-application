export default async function loadPosition() {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    let currentLocation = {
      lat: latitude,
      lng: longitude
    };
    return currentLocation;
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
