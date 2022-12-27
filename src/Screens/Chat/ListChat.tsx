import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getAllUser } from '@Services';
import { useStoreActions, useStoreState } from '@Store';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';

interface IProps {}

const ListChat: React.FC<IProps> = () => {
  const navigation = useNavigation();
  const { getListMessage } = useStoreActions((actions) => actions.chat);
  const { listMessage } = useStoreState((states) => states.chat);
  const currentUser = auth().currentUser;
  const isFocused = useIsFocused();
  useEffect(() => {
    const getConversations = () => {
      getListMessage();
    };
    if (isFocused) getConversations();
  }, [getListMessage, isFocused]);

  const renderItem = ({ item, index }) => {
    const user = item.fullUsers.filter((e) => e.uid != currentUser?.uid);

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() =>
          navigation.navigate('ChatDetail', {
            id: item.chatID,
          })
        }
      >
        <Text>{user[0].email}</Text>
        <Text>{item.last_message}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.txtTitle}>List chat</Text>
      <TouchableOpacity onPress={() => navigation.navigate('NewChat')}>
        <Text style={styles.newChat}>New Chat</Text>
      </TouchableOpacity>
      <FlatList data={listMessage} extraData={listMessage} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  txtTitle: {
    fontSize: 24,
    marginTop: 30,
    marginBottom: 20,
  },
  chatItem: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  newChat: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ListChat;
