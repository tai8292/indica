// This file wraps async-storage functionality
// eslint-disable-next-line no-restricted-imports
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LocalStorage,
  LocalStorageCallback,
  LocalStorageCallbackWithResult,
  LocalStorageKeyValuePair,
  LocalStorageMultiCallback,
  LocalStorageMultiGetCallback,
} from './LocalStorage.type';

const localStorage: LocalStorage = {
  getItem: async (key: string, callback?: LocalStorageCallback): Promise<string | null> => {
    return AsyncStorage.getItem(key, callback);
  },

  setItem: async (key: string, value: string, callback?: LocalStorageCallback): Promise<void> => {
    return AsyncStorage.setItem(key, value, callback);
  },

  removeItem: async (key: string, callback?: LocalStorageCallback): Promise<void> => {
    return AsyncStorage.removeItem(key, callback);
  },

  mergeItem: async (key: string, value: string, callback?: LocalStorageCallback): Promise<void> => {
    return AsyncStorage.mergeItem && AsyncStorage.mergeItem(key, value, callback);
  },

  getAllKeys: async (
    callback?: LocalStorageCallbackWithResult<readonly string[]>,
  ): Promise<readonly string[]> => {
    return AsyncStorage.getAllKeys(callback);
  },

  multiGet: async (
    keys: string[],
    callback?: LocalStorageMultiGetCallback,
  ): Promise<readonly LocalStorageKeyValuePair[] | void> => {
    return AsyncStorage.multiGet(keys, callback);
  },

  multiSet: async (
    keyValuePairs: [string, string][],
    callback?: LocalStorageMultiCallback,
  ): Promise<void> => {
    return AsyncStorage.multiSet(keyValuePairs, callback);
  },

  multiMerge: async (
    keyValuePairs: [string, string][],
    callback?: LocalStorageMultiCallback,
  ): Promise<void> => {
    return AsyncStorage.multiMerge && AsyncStorage.multiMerge(keyValuePairs, callback);
  },

  multiRemove: async (keys: [], callback?: LocalStorageMultiCallback): Promise<void> => {
    return AsyncStorage.multiRemove(keys, callback);
  },

  clear: async (callback?: LocalStorageCallback): Promise<void> => {
    return AsyncStorage.clear(callback);
  },
};

export default localStorage;
