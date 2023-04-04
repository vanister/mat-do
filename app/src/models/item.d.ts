export type Item = {
  id?: string;
  userId: string;
  name: string;
  description?: string;
  scanned?: number;
  found?: boolean;
  createdAt: string;
  lastUpdated?: string;
  lastScanned?: string;
};
