import { useCallback, useState } from "react";
import { ViewProps, View, Image, StyleSheet } from "react-native";

import Images from "@/constants/Images";

export interface AvatarProps {
  uri?: string;
  style?: ViewProps["style"];
}

export const Avatar = ({ uri, style }: AvatarProps) => {
  const [isUsingFallback, setIsUsingFallback] = useState(!uri);
  const [uriToUse, setUriToUse] = useState(uri || Images.emptySprite);

  const handleImageError = useCallback(() => {
    setUriToUse(Images.emptySprite);
    setIsUsingFallback(true);
  }, []);

  return (
    <View style={[style, isUsingFallback && styles.opaqueImage]}>
      <Image
        source={{ uri: uriToUse }}
        style={{ width: "100%", height: "100%" }}
        onError={handleImageError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  opaqueImage: {
    opacity: 0.5,
  },
});
