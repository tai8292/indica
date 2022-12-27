import React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {}

const ChatDetail: React.FC<IProps> = () => {
  return <View style={styles.wrapper}></View>;
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ChatDetail;
