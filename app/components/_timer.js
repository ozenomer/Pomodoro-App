import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Timer = ({ time, textColor, opacity = 1, font }) => {
  let minutes = Math.floor(time / 60).toString().padStart(2, '0');
  let seconds = (time % 60).toString().padStart(2, '0');

  return (
    <View style={styles.timerContainer}>
      <Text style={[styles.timerText, { color: textColor, opacity, fontFamily: font}]}>
        {minutes}
      </Text>

      <Text style={[styles.timerText, { color: textColor, opacity, fontFamily: font}]}>
        {seconds}
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 175,
    fontWeight: "bold",
  },
});

export default Timer;
