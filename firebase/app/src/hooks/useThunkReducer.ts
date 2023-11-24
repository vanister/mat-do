import { useCallback, useReducer } from 'react';

export type ThunkDispatchFunction<TAction> = (
  dispatch: React.Dispatch<TAction>
) => void | Promise<void>;

export type ThunkAction<TAction> = TAction | ThunkDispatchFunction<TAction>;

export function useThunkReducer<TState, TAction>(
  reducerFunc: (state: TState, action: TAction) => TState,
  initialState: TState
): [TState, (action: ThunkAction<TAction>) => void] {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const thunkDispatch = useCallback((action: ThunkAction<TAction>) => {
    if (typeof action === 'function') {
      return (action as ThunkDispatchFunction<TAction>)(thunkDispatch);
    }

    dispatch(action);
  }, []);

  return [state, thunkDispatch];
}
