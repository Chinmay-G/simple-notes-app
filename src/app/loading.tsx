import LoadingView from "@/components/LoadingView";
import React from "react";
import { StyleSheet, View } from "react-native";

const loading = () => {
  return (
    <View style={styles.screen}>
      <LoadingView />
    </View>
  );
};

export default loading;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
