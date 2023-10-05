import { StyleSheet, Text, View } from 'react-native';

import * as DispreadPosSdkReact from 'dispread-pos-sdk-react';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{DispreadPosSdkReact.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
