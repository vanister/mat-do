import { Dispatch, Reducer, useCallback, useReducer } from 'react';

export type GetState<TState> = () => TState;

export type ThunkAction<TAction, TState> = (
  dispatch: Dispatch<TAction>,
  getState?: GetState<TState>
) => void | Promise<void>;

export type ThunkDispatch<TAction, TState> = (
  action: TAction | ThunkAction<TAction, TState>
) => void | Promise<void>;

/**
 * A reducer with a dispatch that allows for thunks to be dispatched.
 *
 * @param reducer The reducer function.
 * @param initialState The initial state of the reducer.
 */
export function useThunkReducer<TState, TAction>(
  reducer: Reducer<TState, TAction>,
  initialState: TState
): [TState, ThunkDispatch<TAction, TState>] {
  const [state, dispatch] = useReducer(reducer, initialState);

  const thunkDispatch = useCallback(
    (action: TAction | ThunkAction<TAction, TState>) => {
      if (typeof action === 'function') {
        const thunkAction = action as ThunkAction<TAction, TState>;

        return thunkAction(thunkDispatch, () => state);
      }

      return dispatch(action);
    },
    [state, dispatch]
  );

  return [state, thunkDispatch];
}
