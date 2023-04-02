export type Item = {
  id?: string;
  name: string;
  userId?: string;
  description?: string;
  scanned?: number;
  scans?: ScannedItem[];
};

export type ScannedItem = {
  scannedAt: string;
  comments: string;
  coordinates?: ItemCoordinates;
};

export type ItemCoordinates = {
  longitude: number;
  latitude: number;
  accuracy: number;
  altitude: number;
};
