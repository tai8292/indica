import { createUser, loginFacebook, LoginGoogle } from '@Services';
import { Action, action, Thunk, thunk } from 'easy-peasy';

export type AuthStore = {
  user: object;
  loginFacebook: Thunk<AuthStore>;
  loginGoogle: Thunk<AuthStore>;
  setUser: Action<AuthStore, object>;
};

const initialState = {
  user: null,
};

export const authStore: AuthStore = {
  ...initialState,
  loginFacebook: thunk(async (actions, body) => {
    try {
      const user = await loginFacebook();
      if (user.additionalUserInfo?.isNewUser) {
        createUser({
          email: user.user.email || '',
          uid: user.user.uid,
        });
      }
      actions.setUser(user);
    } catch (error) {
      throw error;
    }
  }),
  loginGoogle: thunk(async (actions, body) => {
    try {
      const user = await LoginGoogle();
      if (user.additionalUserInfo?.isNewUser) {
        createUser({
          email: user.user.email || '',
          uid: user.user.uid,
        });
      }
      actions.setUser(user);
    } catch (error) {
      throw error;
    }
  }),
  setUser: action((state, payload): void => {
    state.user = payload;
  }),
};
