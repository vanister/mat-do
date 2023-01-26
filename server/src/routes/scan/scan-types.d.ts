export type Coordinates = {
  x: number;
  y: number;
};

export type ScanData = {
  itemId: string;
  description: string;
  coordinates?: Coordinates;
};
