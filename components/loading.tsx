import React from "react";
import { ActivityIndicator, View } from "react-native";

export const Loading: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#3B82F6" />
    </View>
  );
};
