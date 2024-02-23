import { describe, expect, test } from '@jest/globals';
import { getCurrentLocation, getLatLongString } from './geolocation-util';

describe('Geolocation Utility', () => {
  describe('WHEN getting the current position', () => {
    const mockGetCurrentPosition = jest.fn((_, errorCb) => {
      errorCb(new GeolocationPositionError());
    });

    const mockGeolocation: Partial<Geolocation> = {
      getCurrentPosition: mockGetCurrentPosition
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should get the lat, long, accuracy and altitude', async () => {
      const mockPosition = {
        coords: {
          latitude: 123,
          longitude: 456,
          accuracy: 1,
          altitude: 100
        }
      } as GeolocationPosition;

      mockGetCurrentPosition.mockImplementationOnce((successCb, _) => {
        successCb(mockPosition);
      });

      const coords = await getCurrentLocation(mockGeolocation as Geolocation);

      expect(coords).toBeDefined();
      expect(coords).toEqual({
        latitude: 123,
        longitude: 456,
        accuracy: 1,
        altitude: 100
      });
    });

    describe('AND there is an error', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      test('should reject with a error', async () => {
        mockGetCurrentPosition.mockImplementationOnce((_, errorCb) => {
          errorCb(new Error());
        });

        let errorRejected = false;

        try {
          await getCurrentLocation(mockGeolocation as Geolocation);
        } catch (error) {
          // pass
          errorRejected = true;
        }

        if (!errorRejected) {
          throw new Error('Expected an error to be rejected');
        }
      });
    });
  });

  describe('WHEN generating a lat/long string', () => {
    test('should generate with degrees, decimal minutes format', () => {
      const expected = '123.456, -789.012';
      const lagLongString = getLatLongString({
        latitude: 123.456,
        longitude: -789.012,
        accuracy: 1
      });

      expect(lagLongString).toEqual(expected);
    });
  });
});
