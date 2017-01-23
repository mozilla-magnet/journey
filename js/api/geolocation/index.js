// Configuration for geolocation options, using gps, timeout and age
const GEO_CONFIG = {
  enableHighAccuracy: true, 
  timeout: 10000, 
  maximumAge: 1000,
};

// Returns the location if not timeout
export const geolocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition( 
      (position) => { 
        resolve(position); 
      }, 
      (error) => {
        reject(error);
      }, 
      GEO_CONFIG 
    ); 
  });
};

// Watch for any changes in the location of the user
export const geoWatch = (onSuccess, onReject) => {
  return navigator.geolocation.watchPosition(onSuccess, onReject, GEO_CONFIG);
};
