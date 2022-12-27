import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IProps {}

const ListChat: React.FC<IProps> = () => {
  const navigation = useNavigation();
  const fakeData = [1, 2, 3, 4, 5, 6, 7, 8];

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ChatDetail')}>
        <Text>User's name</Text>
        <Text>Lasted message</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.txtTitle}>List chat</Text>
      <FlatList data={fakeData} extraData={fakeData} renderItem={renderItem} />
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
});

export default ListChat;
