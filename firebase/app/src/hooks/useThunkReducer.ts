import { useReducer } from 'react';

export type ThunkDispatchFunction<TAction> = (
  dispatch: React.Dispatch<TAction>
) => void | Promise<void>;

export function useThunkReducer<TState, TAction>(
  reducerFunc: (state: TState, action: TAction) => TState,
  initialState: TState
): [TState, (action: TAction | ThunkDispatchFunction<TAction>) => void] {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const thunkDispatch = (action: TAction | ThunkDispatchFunction<TAction>) => {
    if (typeof action === 'function') {
      return (action as ThunkDispatchFunction<TAction>)(thunkDispatch);
    }

    dispatch(action);
  };

  return [state, thunkDispatch];
}
