
export const getMidpoint = (points) => {
  const len = points.length;
  let x = 0;
  let y = 0;
  let z = 0;

  if (len < 1) throw new Error('Points must not be empty');
  if (len == 1) return points[0];

  for (let i = 0; i < len; i++) {
    let latitude = toRadians(points[i].latitude);
    let longitude = toRadians(points[i].longitude);

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  }

  x /= len;
  y /= len;
  z /= len;

  let longitude = Math.atan2(y, x);
  let latitude = Math.atan2(z, Math.sqrt(x * x + y * y));

  return {
    latitude: toDegrees(latitude),
    longitude: toDegrees(longitude),
  };
};

export const getDelta = (points, center) => {
  return points.reduce((result, { latitude, longitude }) => {
    const latitudeDelta = center.latitude - latitude;
    const longitudeDelta = center.longitude - longitude;

    result.latitude = Math.max(result.latitude, latitudeDelta) * 2;
    result.longitude = Math.max(result.longitude, longitudeDelta) * 2;

    return result;
  }, { latitude: 0, longitude: 0 });
};

/**
 * Utils
 */

function toRadians(decDegrees) {
  return decDegrees * Math.PI / 180;
}

function toDegrees(radians) {
  return 180 * radians / Math.PI;
}
