import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
  QPOSId,
  QPOSInfo,
  QPOSServiceManager as pos,
} from "dspread-pos-sdk-react";
import useFocusEffectAsync from "../../hooks/useFocusEffectAsync";
import { requestBLEPermissions } from "../../services/permissions";
import Accordion from "../../components/Accordion";
import QPOSIdDetails from "./QPOSIdDetails";
import QPOSInfoDetails from "./QPOSInfoDetails";
import useSelectBTDevice from "../../hooks/useSelectBTDevice";

interface Details {
  QPOSId: QPOSId | null;
  QPOSInfo: QPOSInfo | null;
  sdkVersion: string;
}

export default function DetailsScreen() {
  const [details, setDetails] = useState<Details | null>(null);
  const { searchDevices } = useSelectBTDevice();

  useFocusEffectAsync(async () => {
    const permission = await requestBLEPermissions();
    if (!permission) return;
    pos.addEventListener("onBTConnect", searchDevices);
    const connect = await pos.connect(20);
    if (!connect) return;
    const QPOSId = await pos.getQposId();
    const sdkVersion = pos.getSdkVersion();
    const QPOSInfo = await pos.getQposInfo();
    setDetails({
      QPOSId,
      QPOSInfo,
      sdkVersion,
    });

    return () => {
      console.log("DETAILS END");
      pos.resetPosService();
    };
  }, []);

  return (
    <ScrollView style={styles.main}>
      <Text>Detaiiils</Text>
      {details && (
        <>
          {details.QPOSId && (
            <Accordion title="QPOS Id Details">
              <QPOSIdDetails item={details.QPOSId} />
            </Accordion>
          )}
          {details.QPOSInfo && (
            <Accordion title="QPOS Id Details">
              <QPOSInfoDetails item={details.QPOSInfo} />
            </Accordion>
          )}
          <Text>SDK Version: {details.sdkVersion}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
  },
});
