import { useFocusEffect } from "@react-navigation/native";
import { DependencyList, EffectCallback, useCallback } from "react";

type EffectResult = void | EffectCallback;

type EffectCallbackAsync = () => Promise<EffectResult>;

export default function useFocusEffectAsync(
  effect: EffectCallbackAsync,
  deps: DependencyList
) {
  useFocusEffect(
    useCallback(() => {
      let result: EffectResult | null = null;

      effect().then((res) => (result = res));

      return () => {
        if (result && typeof result === "function") result();
      };
    }, deps)
  );
}
