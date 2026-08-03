import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CommonButton from "./CommonButton";

const ErrorState = ({ reload }: { reload: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Something went wrong !</Text>
      <CommonButton title="Try Again" onPress={reload} />
    </View>
  );
};

export default ErrorState;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    borderRadius: 12,
    padding: 12,
    // boxShadow: "0px 1px 2px gray",
  },
  errorText: {
    fontWeight: 700,
    fontSize: 16,
  },
});
