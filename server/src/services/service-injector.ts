const services: Map<string, unknown> = new Map();

export function get<TService>(name: string): TService {
  if (!services.has(name)) {
    throw new Error(`${name} is not registered with this injector`);
  }

  const service = services.get(name) as TService;

  return service;
}

export function registerService<TService>(
  name: string,
  service: TService
): void {
  // replace existing service entry when registering
  services.set(name, service);
}
