import { useNavigation } from '@react-navigation/native';
import { useStoreActions, useStoreState } from '@Store';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';

interface IProps {}

const NewChat: React.FC<IProps> = () => {
  const navigation = useNavigation();
  const { listUser } = useStoreState((stores) => stores.chat);
  const { getAllUser, findMessagesId } = useStoreActions((actions) => actions.chat);

  useEffect(() => {
    const getUsers = async () => {
      await getAllUser();
    };
    getUsers();
  }, [getAllUser]);

  const onGoToChat = async (item) => {
    const messageId = await findMessagesId({
      user1Id: auth().currentUser?.uid,
      user2Id: item.uid,
    });
    navigation.navigate('ChatDetail', { id: messageId, user2: item });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.chatItem} onPress={() => onGoToChat(item)}>
        <Text>{item.email}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList data={listUser} extraData={listUser} renderItem={renderItem} />
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
});

export default NewChat;
