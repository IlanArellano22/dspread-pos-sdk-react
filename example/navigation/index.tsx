import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./config";
import AmountScreen from "../Screens/Amount";
import PaymentScreen from "../Screens/Payment";
import ResultScreen from "../Screens/Result";
import NavigationHeader from "./header";
import DetailsScreen from "../Screens/Details";
import {
  CommunicationMode,
  QPOSServiceManager as pos,
} from "dspread-pos-sdk-react";

export default function Navigation() {
  useEffect(() => {
    const successPosService = pos.initPosService(CommunicationMode.BLUETOOTH);
    console.log({ successPosService });
  }, []);
  return (
    <NavigationContainer>
      <NavigationHeader />
      <RootNavigator />
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
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
