// ShortTimer.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Buttons from "../components/_buttons";
import MotivationText from "../components/_motivationText";
import Timer from "../components/_timer";
import Selections from "../components/_selections";
import LoadingScreen from "../components/_loadingScreen";

const ShortTimer = () => {
  const [time, setTime] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [buttonColor, setButtonColor] = useState("#4EABF2");
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedBg, setSelectedBg] = useState("whiteBg");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [opacity] = useState(new Animated.Value(1));
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getStoredSettings = async () => {
      const storedColor = await AsyncStorage.getItem("selectedColor");
      if (storedColor) setSelectedColor(storedColor);
      const storedBg = await AsyncStorage.getItem("selectedBg");
      if (storedBg) setSelectedBg(storedBg);
      const storedFont = await AsyncStorage.getItem("selectedFont");
      if (storedFont) setSelectedFont(storedFont);
    };
    getStoredSettings();
  }, []);

  const handleLoadingComplete = () => setLoading(false);

  // text rengi
  const Color =
    selectedColor === "cyan"
      ? "#00FFFF"
      : selectedColor === "blue"
      ? "#0000FF"
      : selectedColor === "green"
      ? "#008000"
      : selectedColor === "pink"
      ? "#FFC0CB"
      : selectedColor === "red"
      ? "#FF0000"
      : selectedColor === "yellow"
      ? "#FFDE21"
      : "#000000";

  const textColor =
    selectedColor === "cyan" ||
    selectedColor === "blue" ||
    selectedColor === "green"
      ? "#000"
      : "#fff";


  const backgroundImage =
  selectedBg === "bg1"
      ? require("../../assets/images/bg1.png")
      : selectedBg === "bg2"
      ? require("../../assets/images/bg2.png")
      : selectedBg === "bg3"
      ? require("../../assets/images/bg3.png")
      : selectedBg === "bg4"
      ? require("../../assets/images/bg4.png")
      : selectedBg === "bg5"
      ? require("../../assets/images/bg5.png")
      : selectedBg === "bg6"
      ? require("../../assets/images/bg6.png")
      : selectedBg === "bg7"
      ? require("../../assets/images/bg7.png")
      : selectedBg === "bg8"
      ? require("../../assets/images/bg8.png")
      : require("../../assets/images/whiteBg.png"); 


  // selections opacity animasyonu
  const animateOpacity = (toValue) => {
    Animated.timing(opacity, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animateOpacity(isRunning ? 0 : 1);
  }, [isRunning]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={false}
          hidden={false}
        />
        <LoadingScreen
          color="cyan"
          backgroundImage={backgroundImage}
          loadingDuration={225}
          onLoadingComplete={handleLoadingComplete}
        />
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => isRunning && setIsRunning(false)}>
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        hidden={false}
      />
      <ImageBackground source={backgroundImage} style={styles.imageBackground}>
    
        <View style={styles.headerContainer}>
          <Animated.View
            style={{ opacity }}
            pointerEvents={isRunning ? "none" : "auto"}
          >
            <Selections
              icon1="gear"
              iconColor="#D3D3D3"
              bgColor="transparent"
              nextPage={"/_settingsPage"}
              showPomodoro={false}
            />
          </Animated.View>
        </View>

       
        <View style={styles.contentContainer}>
          <MotivationText
            name="brain"
            nameColor="black"
            textColor={textColor}
            bgColor="#4EABF2"
          />
          <Timer
            time={time}
            font={selectedFont}
            textColor="#4EABF2"
            opacity={1}
          />
          <Buttons
            time={time}
            setTime={setTime}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            started={started}
            setStarted={setStarted}
            buttonColor={buttonColor}
            setButtonColor={setButtonColor}
            resetTime={300}
            nextPage={"/MainPage"}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  imageBackground: {
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
    
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShortTimer;
