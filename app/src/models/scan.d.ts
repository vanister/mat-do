export type ScannedItem = {
  id: string;
  itemId: string;
  scannedAt: string;
  comments: string;
  coordinates?: ItemCoordinates;
};

export type ItemCoordinates = {
  longitude: number;
  latitude: number;
  accuracy: number;
  altitude?: number;
};
