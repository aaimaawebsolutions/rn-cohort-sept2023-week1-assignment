import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Button = ({ label }) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={() => console.log("Pressed the button")}
        style={styles.button}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
