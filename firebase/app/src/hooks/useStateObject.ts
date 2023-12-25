import { useCallback, useState } from 'react';

export type StateObjectUpdater<T> = (state: T) => T;
export type SetStateObjectAction<T> = (newState: Partial<T> | StateObjectUpdater<T>) => void;
export type UseStateObject<T> = [state: T, setState: SetStateObjectAction<T>];

/**
 * A custom hook for quickly using objects and updating them via the `useState` updater function.
 *
 * Shorthand for writing this:
 * ```
 * const [state, useState] = useState(someObj);
 * // more code...
 * setState((s) => ({...s, { value: 42 }}));
 * ```
 */
export function useStateObject<T>(initialState?: T): UseStateObject<T> {
  const [internalState, setInternalState] = useState(initialState);

  const setState = useCallback((newState: Partial<T> | StateObjectUpdater<T>) => {
    if (typeof newState === 'function') {
      setInternalState(newState);
      return;
    }

    setInternalState((i) => ({ ...i, ...newState }));
  }, []);

  return [internalState, setState];
}
