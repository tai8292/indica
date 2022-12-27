import {
  Callback,
  CallbackWithResult,
  KeyValuePair,
  MultiCallback,
  MultiGetCallback,
} from '@react-native-async-storage/async-storage/lib/typescript/types';

export type LocalStorageCallback = Callback;
export type LocalStorageMultiCallback = MultiCallback;
export type LocalStorageCallbackWithResult<T> = CallbackWithResult<T>;
export type LocalStorageMultiGetCallback = MultiGetCallback;
export type LocalStorageKeyValuePair = KeyValuePair;

export interface LocalStorage {
  getItem(key: string, callback?: LocalStorageCallback): Promise<string | null>;

  setItem(key: string, value: string, callback?: LocalStorageCallback): Promise<void>;

  removeItem(key: string, callback?: LocalStorageCallback): Promise<void>;

  mergeItem(key: string, value: string, callback?: LocalStorageCallback): Promise<void>;

  getAllKeys: (
    callback?: LocalStorageCallbackWithResult<readonly string[]>,
  ) => Promise<readonly string[]>;

  multiGet(
    keys: string[],
    callback?: LocalStorageMultiGetCallback,
  ): Promise<readonly LocalStorageKeyValuePair[] | void>;

  multiSet(keyValuePairs: [string, string][], callback?: LocalStorageMultiCallback): Promise<void>;

  multiMerge(
    keyValuePairs: [string, string][],
    callback?: LocalStorageMultiCallback,
  ): Promise<void>;

  multiRemove(keys: string[][], callback?: LocalStorageMultiCallback): Promise<void>;

  clear(callback?: Callback): Promise<void>;
}
