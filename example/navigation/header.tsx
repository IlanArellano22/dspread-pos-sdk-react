import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import modalManager from "../components/Manager/modalManager";
import Menu from "../components/Menu";
import { RootStackParamList } from "./config";

export default function NavigationHeader() {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const onMenu = () => {
    modalManager
      .show(Menu, {
        navigate,
      })
      .then();
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableHighlight
        style={{
          flexGrow: 0,
          padding: 5,
        }}
        onPress={onMenu}
      >
        <Text>Menu</Text>
      </TouchableHighlight>
    </View>
  );
}
