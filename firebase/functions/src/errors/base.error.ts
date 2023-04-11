export abstract class BaseError extends Error {
  constructor(public readonly name: string, message?: string) {
    super(message);
  }
}
