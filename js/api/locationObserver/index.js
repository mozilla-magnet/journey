// Configuration for location options, using gps, timeout and age
const LOCATION_CONFIG = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 1000,
  distanceFilter: 1,
};

let instance = null;

export default class LocationObserver {
  constructor(onUpdate, onError) {
    if (instance) {
      return instance;
    }

    instance = this;

    this.watchId = null;
    this.onUpdate = onUpdate;
    this.onError = onError;

    this.date = new Date();

    this.enable();
  }

  static get instance() {
    return instance;
  }

  enable() {
    this._getLocation();
    this._watchLocation();
  }

  disable() {
    this._clearWatch();
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
}
