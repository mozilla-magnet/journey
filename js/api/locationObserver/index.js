const ReactNative = require('react-native');
const { 
  AppState,
} = ReactNative;

// Configuration for location options, using gps, timeout and age
const LOCATION_CONFIG = {
  enableHighAccuracy: true, 
  timeout: 10000, 
  maximumAge: 1000,
  distanceFilter: 5,
};

export default class LocationObserver {
  constructor(onUpdate, onError) {
    this.watchId = null;
    this.onUpdate = onUpdate;
    this.onError = onError;

    AppState.addEventListener('change', this.onAppStateChange.bind(this));

    this._getLocation();
    this._watchLocation();
  }

  onAppStateChange(appState) {
    switch(appState) {
      case 'active':
        this._getLocation();
        this._watchLocation();
        break;
      case 'background':
      case 'innactive':
        this._clearWatch();
        break;
    }
  }

  _getLocation() {
    navigator.geolocation.getCurrentPosition(this.onUpdate, this.onError, LOCATION_CONFIG);
  }

  _watchLocation() {
    this.watchId = navigator.geolocation.watchPosition(this.onUpdate, this.onError, LOCATION_CONFIG);
  }

  _clearWatch() {
    navigator.geolocation.clearWatch(this.watchId);
  }
};
