import { QPOSId } from "dspread-pos-sdk-react";
import React from "react";
import { Text, View } from "react-native";

interface QPOSIdDetailsProps {
  item: QPOSId;
}

export default function QPOSIdDetails({ item }: QPOSIdDetailsProps) {
  return (
    <View>
      <Text>csn: {item.csn}</Text>
      <Text>deviceNumber: {item.deviceNumber}</Text>
      <Text>isKeyboard: {item.isKeyboard}</Text>
      <Text>macAddress: {item.macAddress}</Text>
      <Text>merchantId: {item.merchantId}</Text>
      <Text>nfcID: {item.nfcID}</Text>
      <Text>posId: {item.posId}</Text>
      <Text>psamId: {item.psamId}</Text>
      <Text>psamNo: {item.psamNo}</Text>
      <Text>tmk0Status: {item.tmk0Status}</Text>
      <Text>tmk1Status: {item.tmk1Status}</Text>
      <Text>tmk2Status: {item.tmk2Status}</Text>
      <Text>tmk3Status: {item.tmk3Status}</Text>
      <Text>tmk4Status: {item.tmk4Status}</Text>
      <Text>vendorCode: {item.vendorCode}</Text>
    </View>
  );
}
