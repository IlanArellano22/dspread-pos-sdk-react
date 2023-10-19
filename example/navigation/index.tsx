import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QPOSContextProvider } from "../context/QPOSContext";
import { RootStackParamList } from "./config";
import AmountScreen from "../Screens/Amount";
import PaymentScreen from "../Screens/Payment";

export default function Navigation() {
  return (
    <NavigationContainer>
      <QPOSContextProvider>
        <RootNavigator />
      </QPOSContextProvider>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Amount"
        component={AmountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
