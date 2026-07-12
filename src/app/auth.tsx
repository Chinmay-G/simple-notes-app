import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const Login = () => {
  const [userInput, setUserInput] = useState<any>({ email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  async function handleSubmit() {
    if (isSignUp) {
      const { data, error: signUpError } =
        await supabase.auth.signUp(userInput);
      if (signUpError) {
        console.error("Error Signing up", signUpError?.message);
      }
    } else {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword(userInput);
      if (signInError) {
        console.error("Error Signing in", signInError?.message);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabsButtonContainer}>
        <Pressable
          style={[styles.tabButton, isSignUp && styles.tabButtonSelected]}
          onPress={() => setIsSignUp(true)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        <Pressable
          style={[styles.tabButton, !isSignUp && styles.tabButtonSelected]}
          onPress={() => setIsSignUp(false)}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </View>

      <View style={styles.inputsContainer}>
        <View>
          <Text style={styles.inputlabel}>Title</Text>
          <TextInput
            placeholder="Email"
            value={userInput?.email}
            textContentType="emailAddress"
            onChangeText={(text) =>
              setUserInput((prev: any) => ({ ...prev, email: text }))
            }
            style={styles.textBox}
          />
        </View>
        <View>
          <Text style={styles.inputlabel}>Description</Text>
          <TextInput
            multiline
            textContentType="password"
            numberOfLines={3}
            placeholder="Task password..."
            value={userInput?.password}
            onChangeText={(text) =>
              setUserInput((prev: any) => ({ ...prev, password: text }))
            }
            style={styles.textBox}
          />
        </View>

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    display: "flex",
    gap: 16,
    // justifyContent: "center",
    paddingTop: 100,
    alignItems: "center",
  },
  tabsButtonContainer: {
    flexDirection: "row",
    gap: 32,
    alignItems: "center",
    width: "70%",
    justifyContent: "space-around",
  },
  tabButton: {
    padding: 8,
    backgroundColor: "#939393",
    borderRadius: 6,
    boxShadow: "0px 1px 2px gray",
  },
  tabButtonSelected: {
    padding: 8,
    backgroundColor: "#000",
    borderRadius: 6,
    boxShadow: "0px 1px 2px gray",
  },

  inputsContainer: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: "80%",
    display: "flex",
    gap: 12,
    backgroundColor: "#ffff",
  },
  textBox: {
    padding: 6,
    borderWidth: 0.5,
    borderRadius: 6,
    fontSize: 16,
  },
  inputlabel: {
    fontSize: 16,
    fontWeight: 500,
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
    fontSize: 16,
    textAlign: "center",
  },
});
