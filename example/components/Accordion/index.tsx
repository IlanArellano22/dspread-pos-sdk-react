import { useValueHandler } from "@ihaz/react-ui-utils";
import React, { PropsWithChildren, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AccordionProps extends PropsWithChildren {
  title: string;
}

export default function Accordion({ children, title }: AccordionProps) {
  const [init, setInit] = useState<boolean>(false);
  const [open, setOpen] = useValueHandler<boolean>(false);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const progressiveHeight = useRef(new Animated.Value(0)).current;

  console.log({ layoutHeight });

  const bodyHeight = progressiveHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1000],
  });

  const toggleItem = () => {
    const _open = open();
    if (!init) setInit(true);
    Animated.timing(progressiveHeight, {
      toValue: _open ? 0 : 1,
      useNativeDriver: false,
      duration: 300,
    }).start();
    setOpen((prev) => !prev);
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={toggleItem}>
        <Text>{title}</Text>
      </TouchableOpacity>
      <Animated.View
        onLayout={(e) => {
          if (!layoutHeight) setLayoutHeight(e.nativeEvent.layout.height);
        }}
        style={{
          height: bodyHeight,
        }}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    paddingVertical: 15,
  },
});
