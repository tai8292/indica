import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useStoreActions } from '@Store';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';

interface IProps {}

const ChatDetail: React.FC<IProps> = () => {
  const route = useRoute();
  const { params } = route;
  const { id, user2 } = params || '';
  const [messageId, setMessageId] = useState<string>(id);
  const [messages, setMessages] = useState<object[]>([]);
  const [text, setText] = useState('');
  const { createMessageConversation, sendMessage } = useStoreActions((actions) => actions.chat);
  useEffect(() => {
    if (messageId) {
      const subscriber = firestore()
        .collection(messageId)
        .orderBy('createdAt', 'desc')
        .onSnapshot((documentSnapshot) => {
          const mess: object[] = [];
          documentSnapshot.forEach((e) => {
            mess.push(e.data());
          });
          setMessages([...messages, ...mess]);
        });

      // Stop listening for updates when no longer required
      return () => subscriber();
    } else {
      const createConversation = async () => {
        const result = await createMessageConversation({
          user1:
            {
              uid: auth().currentUser?.uid,
              email: auth().currentUser?.email,
            } || {},
          user2: user2,
        });
        setMessageId(result);
      };

      createConversation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createMessageConversation, messageId, user2]);

  const onSendMessage = async () => {
    await sendMessage({
      id: messageId,
      message: text,
    });
    setText('');
  };

  const renderItem = ({ item, index }) => {
    if (item.sendBy === 'system') {
      return null;
    }
    const isMe = item.sendBy == auth().currentUser?.uid;

    return (
      <View style={[styles.messageContainer, isMe ? styles.right : styles.left]}>
        <Text style={[styles.messageItem, { backgroundColor: isMe ? '#54a8fe' : 'gray' }]}>
          {item.message}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentContainer}>
        <FlatList inverted data={messages} renderItem={renderItem} extraData={messages} />
      </View>
      <View style={[styles.row, styles.bottom]}>
        <TextInput style={styles.input} value={text} onChangeText={(value) => setText(value)} />
        <TouchableOpacity onPress={onSendMessage}>
          <Text style={styles.send}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginRight: 20,
  },
  bottom: {
    alignItems: 'center',
  },
  send: {
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: 20,
  },
  messageContainer: {
    width: '100%',
    marginTop: 16,
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  messageItem: {
    padding: 12,
    color: 'white',
  },
});

export default ChatDetail;
