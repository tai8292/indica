import { createStore, createTypedHooks } from 'easy-peasy';

import { authStore, AuthStore } from './Auth.store';
import { chatStore, ChatStore } from './Chat.store';

export interface StoreModel {
  auth: AuthStore;
  chat: ChatStore;
}

const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<StoreModel>();

/*
 This is to fix an issue with
 easy - peasy https://github.com/ctrlplusb/easy-peasy/issues/599#issuecomment-781258630
 and react native https://github.com/facebook/react-native/issues/28602
*/
window.requestIdleCallback = null;

export const storeModel: StoreModel = {
  chat: chatStore,
  auth: authStore,
};

// TODO: Provide type definition for this
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let storeEnhancers: any = [];

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const reactotron = require('../../ReactotronConfig').default;
  reactotron.initiate();
  storeEnhancers = [...storeEnhancers, reactotron.createEnhancer()];
}

const store = createStore(storeModel, {
  name: 'Indica',
  enhancers: [...storeEnhancers],
});

export { useStoreActions, useStoreState, useStoreDispatch, useStore };

export default store;
