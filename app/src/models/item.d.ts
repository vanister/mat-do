export type Item = {
  id?: string;
  name: string;
  userId?: string;
  description?: string;
  scanned?: number;
  scans?: Scan[];
};

export type Scan = {
  scannedAt: string;
  comments: string;
  coordinates: ItemCoordinates;
};

export type ItemCoordinates = {
  longitude: number;
  latitude: number;
  accuracy: number;
  altitude: number;
};
