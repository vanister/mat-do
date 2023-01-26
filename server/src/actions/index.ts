export type ActionResult<T extends unknown> = {
  status: number;
  data?: T;
};

export function result<T>(data?: T, status = 200): ActionResult<T> {
  return { status, data };
}
