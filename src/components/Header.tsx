import { logout } from "@/services/auth";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Header = ({ userEmail }: any) => {
  return (
    <View style={styles.screenHeader}>
      <Text style={styles.emailText}>{userEmail}</Text>
      <Pressable
        style={[styles.button, { alignSelf: "flex-end" }]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>LOGOUT</Text>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  screenHeader: {
    width: "100%",
    padding: 12,

    flexDirection: "row",
    gap: 6,
    // alignItems: "center",
    alignItems: "flex-end",
    // justifyContent: "flex-end",
    justifyContent: "space-between",
    boxShadow: "0px 2px 2px black",
    backgroundColor: "white",
  },
  emailText: {
    fontSize: 13,
    textDecorationLine: "underline",
  },
  button: {
    padding: 8,
    backgroundColor: "#000",
    borderRadius: 6,
    boxShadow: "0px 1px 2px gray",
  },
  buttonText: {
    color: "#ffff",
    fontWeight: 800,
    fontSize: 10,
    textAlign: "center",
  },
});
