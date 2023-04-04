import { ItemCoordinates } from '../models/scan';

export function checkGeolocationSupport(): boolean {
  return 'geolocation' in navigator;
}

/**
 * Requests the user's current location.
 *
 * NOTE: this requires a secure context (https).
 *
 * @param geolocation The Geolocation object from the navigator.
 * @param highAccuracy True, for high accuracy. False, otherwise.
 */
export function getCurrentLocation(
  geolocation?: Geolocation,
  highAccuracy = false
): Promise<ItemCoordinates> {
  const geo: Geolocation = geolocation ?? navigator.geolocation;

  const promise = new Promise<ItemCoordinates>((resolove, reject) => {
    geo.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { longitude, latitude, accuracy, altitude } = position.coords;

        resolove({ longitude, latitude, accuracy, altitude });
      },
      (error: GeolocationPositionError) => {
        reject(error);
      },
      { enableHighAccuracy: highAccuracy }
    );
  });

  return promise;
}
