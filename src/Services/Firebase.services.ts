/* eslint-disable @typescript-eslint/no-throw-literal */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

export const loginFacebook = async () => {
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
};

export const createUser = async ({ email, uid }: { email?: string; uid: string }) => {
  firestore().collection('USER').doc(uid).set({
    email: email,
    uid: uid,
  });
};

export const getAllUser = async () => {
  const currentUser = auth().currentUser;

  return firestore().collection('USER').where('email', '!=', currentUser?.email).get();
};

export const findMessagesDetail = async ({
  user1Id,
  user2Id,
}: {
  user1Id: string;
  user2Id: string;
}) => {
  return firestore()
    .collection('CHAT')
    .where('users', 'array-contains-any', [user1Id, user2Id])
    .get();
};

export const createMessageConversation = async ({
  user1,
  user2,
}: {
  user1: object;
  user2: object;
}) => {
  try {
    await firestore()
      .collection('CHAT')
      .doc(user1.uid + user2.uid)
      .set({
        chatID: user1.uid + user2.uid,
        last_message: '',
        users: [user1.uid, user2.uid],
        fullUsers: [user1, user2],
      });
    await firestore()
      .collection(user1.uid + user2.uid)
      .add({
        createdAt: new Date().getTime(),
        message: 'Say Hi',
        sendBy: 'system',
      });
  } catch (error) {
    console.log('err', error);
  }
};

export const sendMessage = async ({ id, message }: { id: string; message: string }) => {
  const userId = auth().currentUser?.uid;
  await firestore().collection(id).add({
    createdAt: new Date().getTime(),
    message: message,
    sendBy: userId,
  });
  firestore().collection('CHAT').doc(id).update({
    'last_message': message,
  });
};

export const findAllConversation = async () => {
  return firestore()
    .collection('CHAT')
    .where('users', 'array-contains', auth().currentUser?.uid)
    .get();
};
