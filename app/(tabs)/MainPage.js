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

  const MainPage = () => {
    const [time, setTime] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);
    const [started, setStarted] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#0A0A0A");
    const [selectedBg, setSelectedBg] = useState("whiteBg");
    const [selectedFont, setSelectedFont] = useState("Arial");
    const [opacity] = useState(new Animated.Value(1));
    const [loading, setLoading] = useState(true);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [skipCount, setSkipCount] = useState(0);

    const handleLoadingComplete = () => {
      setLoading(false);
    };

    useEffect(() => {
      const fetchSkipCount = async () => {
        try {
          const value = await AsyncStorage.getItem('skipCount');
          if (value) setSkipCount(parseInt(value));
        } catch (e) {
          console.error("Skip sayısı alınamadı:", e);
        }
      };
      fetchSkipCount();
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

    const Color =
      selectedColor === "cyan"
        ? "#00BCD4"
        : selectedColor === "blue"
        ? "#1976D2"
        : selectedColor === "green"
        ? "#388E3C"
        : selectedColor === "pink"
        ? "#D81B60"
        : selectedColor === "red"
        ? "#F44336"
        : selectedColor === "yellow"
        ? "#FFEB3B"
        : selectedColor === "white"
        ? "#E8EAEF"
          : selectedColor === "gray"
        ? "#767779"
        : "#0A0A0A";

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
          />
          <LoadingScreen
            color={"cyan"}
            backgroundImage={backgroundImage}
            loadingDuration={225}
            onLoadingComplete={handleLoadingComplete}
          />
        </SafeAreaView>
      );
    }

    const buttonColor = selectedBg === "whiteBg" ? "#D3D3D3" : Color;


    const handleTouch = () => {
      if (isRunning) {
        setIsRunning(false); 
      }
    };

    return (
      <TouchableWithoutFeedback onPress={handleTouch}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={false}
          />
          <ImageBackground
            source={backgroundImage}
            style={styles.imageBackground}
          >
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
                  pomodoro={skipCount}
                />
              </Animated.View>
            </View>

            <View style={styles.contentContainer}>
              <MotivationText
                name="brain"
                nameColor="black"
                textColor="black"
                bgColor="#D3D3D3"
              />
              <Timer
                time={time}
                font={selectedFont}
                textColor={Color}
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
                setButtonColor={buttonColor}
                resetTime={1500}
                nextPage={"/shortTimer"}
                shouldCountSkip={true}
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

  export default MainPage;
