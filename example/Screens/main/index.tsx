import { QPOSListenners } from "dispread-pos-sdk-react/DispreadPosSdkReact.types";
import { useContext, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { QPOSContext } from "../../context/QPOSContext";

export default function MainScreen() {
  const { getPos, addEventListenners, removeEventListenners, initPosService } =
    useContext(QPOSContext);

  const listeners = useMemo<Partial<QPOSListenners>>(
    () => ({
      onRequestQposConnected: () => {
        console.log("QPOS Connected");
      },
      onQposInitModeResult: (isSuccess) => {
        console.log("init Mode success ", isSuccess);
      },
      onError: (code) => {
        console.log("Error ", code);
      },
      onRequestNoQposDetected: () => {
        console.log("No QPOS Detected");
      },
      onQposIdResult(posId) {
        console.log("posId ", posId);
      },
    }),
    []
  );

  useEffect(() => {
    initPosService();
    addEventListenners(listeners);

    return () => {
      removeEventListenners();
    };
  }, []);

  const onGetPosId = () => {
    const pos = getPos();
    pos?.getQposId();
  };

  return (
    <View style={styles.container}>
      <Text>Dispread POS</Text>
      <TouchableHighlight>
        <Text onPress={onGetPosId}>GetPosId</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
