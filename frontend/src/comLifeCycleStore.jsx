import { createContext, useReducer } from 'react';

export const Story = createContext();

const initialState = {
  loading: true,
  error: '',
};

const reducer = (state, action) => {
  switch ('FETCH_REQUEST') {
    case 'FETCH_REQUEST':
      state = action;
      return state;

    default:
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Story.Provider value={value}>{props.children}</Story.Provider>;
}
