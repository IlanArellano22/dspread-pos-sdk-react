import { QPOSInfo } from "dspread-pos-sdk-react";
import React from "react";
import { Text, View } from "react-native";

interface QPOSIdDetailsProps {
  item: QPOSInfo;
}

export default function QPOSInfoDetails({ item }: QPOSIdDetailsProps) {
  return (
    <View>
      <Text>Manufacturere: {item.Manufacturere}</Text>
      <Text>ModelInfor: {item.ModelInfor}</Text>
      <Text>OTAversion: {item.OTAversion}</Text>
      <Text>PCI_firmwareVersion: {item.PCI_firmwareVersion}</Text>
      <Text>PCI_hardwareVersion: {item.PCI_hardwareVersion}</Text>
      <Text>SUB: {item.SUB}</Text>
      <Text>Voltage: {item.Voltage}</Text>
      <Text>batteryLevel: {item.batteryLevel}</Text>
      <Text>batteryPercentage: {item.batteryPercentage}</Text>
      <Text>bootloaderVersion: {item.bootloaderVersion}</Text>
      <Text>compileTime: {item.compileTime}</Text>
      <Text>firmwareVersion: {item.firmwareVersion}</Text>
      <Text>hardwareVersion: {item.hardwareVersion}</Text>
      <Text>isCharging: {item.isCharging}</Text>
      <Text>isKeyboard: {item.isKeyboard}</Text>
      <Text>isSupportedTrack1: {item.isSupportedTrack1}</Text>
      <Text>isSupportedTrack2: {item.isSupportedTrack2}</Text>
      <Text>isSupportedTrack3: {item.isSupportedTrack3}</Text>
      <Text>isUsbConnected: {item.isUsbConnected}</Text>
      <Text>updateWorkKeyFlag: {item.updateWorkKeyFlag}</Text>
    </View>
  );
}
