import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>No note. Add a note to see more.</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    borderRadius: 12,
    padding: 12,
    boxShadow: "0px 1px 2px gray",
  },
  messageText: {
    fontWeight: 700,
    fontSize: 18,
  },
});
