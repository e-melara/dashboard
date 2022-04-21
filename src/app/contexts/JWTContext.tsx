import { createContext, FC, useEffect, useReducer } from "react";

import { User } from "app/interfaces";
import { inValidToken, setSession, jsonTranform, api } from "app/api";

import {
  ROUTE_LOGIN_API,
  KEY_TOKEN_STORAGE,
  ROUTE_INITILIZE_API,
} from "app/const";

interface JWTAuthProps {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
}

interface Action {
  type: string;
  payload?: any;
}

const handlers = {
  INITIALIZE: (state: JWTAuthProps, action: Action): JWTAuthProps => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: JWTAuthProps, { payload }: Action): JWTAuthProps => {
    const { user } = payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: JWTAuthProps): JWTAuthProps => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state: JWTAuthProps, action: Action): JWTAuthProps => {
  switch (action.type) {
    case "INITIALIZE":
      return handlers.INITIALIZE(state, action);
    case "LOGIN":
      return handlers.LOGIN(state, action);
    case "LOGOUT":
      return handlers.LOGOUT(state);
    default:
      return state;
  }
};

const initialState: JWTAuthProps = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

interface ContextProps extends JWTAuthProps {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  method: "jwt";
}

export const AuthContext = createContext<ContextProps>({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

console.log("click en account");

export const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken =
          window.localStorage.getItem(KEY_TOKEN_STORAGE) ?? "";
        if (accessToken && inValidToken(accessToken)) {
          setSession(accessToken);
          const response = await api.post(ROUTE_INITILIZE_API);

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: jsonTranform(response.data),
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const login = async (email: string, password: string) => {
    const response = await api.post(ROUTE_LOGIN_API, {
      email,
      password,
    });

    const { token, user } = response.data;
    setSession(token);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
