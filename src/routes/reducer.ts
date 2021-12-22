import { initialState } from "./initalState";

type ACTIONTYPE =
  | {type: 'REFRESH_TOKEN'; payload: {token: string}}
  | {type: 'LOGIN'; payload: {token: string}}
  | {type: 'LOGOUT';};

export function reducer(state: typeof initialState, action: ACTIONTYPE): typeof initialState {
  switch (action.type) {
    case 'REFRESH_TOKEN':
      return {
        ...state,
        userToken: action.payload.token,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...state,
        isSignout: false,
        userToken: action.payload?.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
  }
}
