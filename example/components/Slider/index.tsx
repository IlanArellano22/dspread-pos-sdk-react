import React, { PropsWithChildren, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";
import ModalBase from "../Manager/modalBase";

interface SliderProps extends PropsWithChildren {
  onHide?: () => void;
}

const { width } = Dimensions.get("window");

export default function Slider({ children, onHide }: SliderProps) {
  const sliderPan = useRef(
    new Animated.ValueXY({
      x: -width,
      y: 0,
    })
  ).current;
  let timer: NodeJS.Timeout;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const dx = gestureState.dx;
        if (dx > 0) return;
        return Animated.event([null, { dx: sliderPan.x }], {
          useNativeDriver: false,
        })(e, gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        const dx = gestureState.dx;
        if (dx > 0) return;
        if (Math.abs(dx) > width / 4) {
          if (timer) clearTimeout(timer);
          Animated.spring(sliderPan, {
            toValue: { x: -width, y: 0 },
            useNativeDriver: false,
          }).start();
          timer = setTimeout(() => {
            if (onHide) onHide();
          }, 400);
        } else {
          Animated.spring(sliderPan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    Animated.timing(sliderPan, {
      toValue: { x: 0, y: 0 },
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);

  const onRequestClose = () => {
    if (timer) clearTimeout(timer);
    Animated.spring(sliderPan, {
      toValue: { x: -width, y: 0 },
      useNativeDriver: false,
    }).start();
    timer = setTimeout(() => {
      if (onHide) onHide();
    }, 400);
  };

  return (
    <ModalBase onRequestClose={onRequestClose} onHide={onRequestClose}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.SliderView,
          { transform: [{ translateX: sliderPan.x }] },
        ]}
      >
        {children}
      </Animated.View>
    </ModalBase>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  SliderView: {
    width: "50%",
    height: "100%",
    backgroundColor: "#ffffff",
    paddingHorizontal: 38,
    zIndex: 99,
  },
});
