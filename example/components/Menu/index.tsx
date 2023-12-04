import { ViewProps } from "@ihaz/react-ui-utils/lib/manager/View/comp";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../navigation/config";
import Slider from "../Slider";

interface MenuProps extends ViewProps {
  navigate: (screen: keyof RootStackParamList) => void;
}

export default function Menu({ onClose, navigate }: MenuProps) {
  const onNavigate = (screen: keyof RootStackParamList) => {
    navigate(screen);
    onClose();
  };
  return (
    <Slider onHide={() => onClose()}>
      <Text style={styles.title}>Menuuu</Text>
      <TouchableOpacity onPress={() => onNavigate("Details")}>
        <Text>POS Details</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
    </Slider>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
});
