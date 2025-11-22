import React from "react";

import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaViewProps extends ViewProps {
  bottom: boolean;
}

const SafeAreaView: React.FC<SafeAreaViewProps> = ({ children, bottom, style, ...props }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: "white",
          paddingTop: insets.top,
          paddingBottom: bottom ? insets.bottom : 0,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default SafeAreaView;