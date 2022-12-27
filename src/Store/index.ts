import { localStorage } from '@Core';
import rootStore, { RootModel } from '@Store/Root.store';
import { createStore, createTypedHooks, persist } from 'easy-peasy';

export interface StoreModel {
  root: RootModel;
}

const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<StoreModel>();

const customStorage = {
  async getItem(key: string) {
    const data = await localStorage.getItem(key);
    if (data === null) {
      return null;
    }

    return JSON.parse(data);
  },
  async setItem(key: string, data: unknown) {
    return localStorage.setItem(key, JSON.stringify(data));
  },
  async removeItem(key: string) {
    return localStorage.removeItem(key);
  },
};

/*
 This is to fix an issue with
 easy - peasy https://github.com/ctrlplusb/easy-peasy/issues/599#issuecomment-781258630
 and react native https://github.com/facebook/react-native/issues/28602
*/
window.requestIdleCallback = null;

export const storeModel: StoreModel = {
  root: persist(rootStore, {
    storage: customStorage,
  }),
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
  name: 'Starbucks',
  enhancers: [...storeEnhancers],
});

export { useStoreActions, useStoreState, useStoreDispatch, useStore };

export default store;
