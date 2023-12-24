import { useCallback, useReducer, useRef } from 'react';

export type GetState<TState> = () => TState;

export type ThunkDispatchFunction<TAction, TState> = (
  dispatch: React.Dispatch<TAction>,
  getState?: GetState<TState>
) => void | Promise<void>;

export type ThunkAction<TAction, TState> = TAction | ThunkDispatchFunction<TAction, TState>;

export function useThunkReducer<TState, TAction>(
  reducerFunc: (state: TState, action: TAction) => TState,
  initialState: TState
): [TState, (action: ThunkAction<TAction, TState>) => void] {
  const [state, dispatch] = useReducer(reducerFunc, initialState);
  const dispatchRef = useRef(dispatch);

  dispatchRef.current = dispatch;

  const thunkDispatch = useCallback(
    (action: ThunkAction<TAction, TState>) => {
      if (typeof action === 'function') {
        return (action as ThunkDispatchFunction<TAction, TState>)(thunkDispatch, () => state);
      }

      dispatchRef.current(action);
    },
    [state]
  );

  return [state, thunkDispatch];
}
