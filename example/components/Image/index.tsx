import React, { useMemo } from "react";
import { Image, ImageProps } from "react-native";

type Images = "visa" | "mastercard";

const IMAGE_DICTIONATY: Record<Images, () => number> = {
  visa: () => require("../../assets/visa.png"),
  mastercard: () => require("../../assets/mastercard.png"),
};

interface ImageComponentProps extends Omit<ImageProps, "source"> {
  image: Images;
}

export default function ImageComponent(props: ImageComponentProps) {
  const getImage = useMemo(() => {
    const image = IMAGE_DICTIONATY[props.image]?.();
    return image;
  }, [props.image]);

  return <Image source={getImage} {...props} />;
}
