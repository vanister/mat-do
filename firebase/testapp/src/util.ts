export type LogOptions = {
  verbose: boolean;
};

export function log(...msg: any[]) {
  console.log('Matdo TestApp Info >>', ...msg);
}

export function logError(...msg: any[]) {
  console.error('Matdo TestApp Error >>', ...msg);
}

export function logWithOptions({ verbose }: LogOptions) {
  return function (...msg: any[]) {
    if (verbose) {
      log(...msg);
    }
  };
}
