import React, { Children } from "react";
import {
  Dimensions,
  Modal,
  ModalProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export interface ModalBaseProps extends ModalProps {
  onHide?: () => void;
}

type ModalType = "center" | "top" | "bottom";

const { width, height } = Dimensions.get("window");

export default function ModalBase({
  children,
  onHide,
  ...props
}: ModalBaseProps) {
  return (
    <Modal {...props} animationType="fade" transparent visible>
      {onHide && (
        <TouchableWithoutFeedback
          style={[
            StyleSheet.absoluteFill,
            styles.closeArea,
            {
              borderWidth: 1,
              borderColor: "#000000",
            },
          ]}
          onPress={onHide}
        >
          <View style={styles.closeContain} />
        </TouchableWithoutFeedback>
      )}
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeArea: {
    width,
    height,
    zIndex: 100,
  },
  closeContain: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});
