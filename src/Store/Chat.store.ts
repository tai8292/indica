import {
  createMessageConversation,
  findAllConversation,
  findMessagesDetail,
  getAllUser,
  loginFacebook,
  sendMessage,
} from '@Services';
import { Action, action, Thunk, thunk } from 'easy-peasy';

export type ChatStore = {
  listMessage: object[];
  listUser: object[];
  getListMessage: Thunk<ChatStore>;
  setListMessage: Action<ChatStore, object[]>;
  getAllUser: Thunk<ChatStore>;
  setUsers: Action<ChatStore, object[]>;
  getMessagesDetail: Thunk<ChatStore, { id: string }>;
  findMessagesId: Thunk<ChatStore, { user1Id?: string; user2Id: string }>;
  createMessageConversation: Thunk<ChatStore, { user1?: object; user2: object }>;
  sendMessage: Thunk<ChatStore, { id: string; message: string }>;
};

const initialState = {
  listMessage: [],
  listUser: [],
};

export const chatStore: ChatStore = {
  ...initialState,
  getListMessage: thunk(async (actions, body) => {
    try {
      const result = await findAllConversation();
      const arrCon: object[] = [];
      result.forEach((e) => {
        arrCon.push(e.data());
      });
      actions.setListMessage(arrCon);
    } catch (error) {
      throw error;
    }
  }),
  setListMessage: action((state, payload): void => {
    state.listMessage = payload;
  }),
  getAllUser: thunk(async (actions) => {
    try {
      const user = await getAllUser();
      const users: object[] = [];
      user.forEach((e) => {
        users.push(e.data());
      });
      actions.setUsers(users);
    } catch (error) {
      throw error;
    }
  }),
  setUsers: action((state, payload): void => {
    state.listUser = payload;
  }),
  getMessagesDetail: thunk(async (actions, body) => {
    try {
      await loginFacebook();
    } catch (error) {
      throw error;
    }
  }),
  findMessagesId: thunk(async (actions, body) => {
    try {
      const messagesIds = await findMessagesDetail({
        user1Id: body.user1Id || '',
        user2Id: body.user2Id,
      });
      if (messagesIds.size > 0) {
        return messagesIds.docs[0].data();
      }

      return '';
    } catch (error) {
      return '';
    }
  }),
  createMessageConversation: thunk(async (actions, body) => {
    try {
      await createMessageConversation({
        user1: body.user1 || {},
        user2: body.user2,
      });

      return body.user1.uid + body.user2.uid;
    } catch (error) {
      return '';
    }
  }),
  sendMessage: thunk(async (actions, body) => {
    try {
      await sendMessage({
        id: body.id,
        message: body.message,
      });
    } catch (error) {
      throw error;
    }
  }),
};
