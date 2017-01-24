// Configuration for location options, using gps, timeout and age
const LOCATION_CONFIG = {
  enableHighAccuracy: true, 
  timeout: 10000, 
  maximumAge: 1000,
};

// Returns the location if not timeout
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition( 
      resolve, 
      reject, 
      LOCATION_CONFIG 
    ); 
  });
};

// Watch for any changes in the location of the user
export const locationWatch = (onUpdate, onError) => {
  return navigator.geolocation.watchPosition(onUpdate, onError, LOCATION_CONFIG);
};
