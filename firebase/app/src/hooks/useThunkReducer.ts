import { Dispatch, useCallback, useReducer, useRef } from 'react';

export type GetState<S> = () => S;

export type ThunkAction<A, S> = (
  dispatch: Dispatch<A>,
  getState?: GetState<S>
) => void | Promise<void>;

export type ThunkDispatch<A, S> = Dispatch<A> | ThunkAction<A, S>;

export function useThunkReducer<S, A>(
  reducer: (state: S, action: A) => S,
  initialState: S
): [S, (action: A) => void | ThunkDispatch<A, S>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchRef = useRef(dispatch);

  dispatchRef.current = dispatch;

  const thunkDispatch = useCallback(
    (action: A) => {
      if (typeof action === 'function') {
        return action(thunkDispatch, () => state);
      }

      dispatchRef.current(action);
    },
    [state]
  );

  return [state, thunkDispatch];
}
