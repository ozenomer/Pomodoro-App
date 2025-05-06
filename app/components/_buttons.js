    import React, { useEffect, useState } from "react";
    import { View, StyleSheet, TouchableOpacity } from "react-native";
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import { useRouter } from "expo-router";
    import Toast from 'react-native-toast-message';  
    import * as Haptics from 'expo-haptics'; 
    import AntDesign from '@expo/vector-icons/AntDesign';
    import AsyncStorage from '@react-native-async-storage/async-storage';

 
    const Buttons = ({
      time,
      setTime,
      isRunning,
      setIsRunning,
      started,
      setStarted,
      buttonColor,
      setButtonColor,
      resetTime = 0,
      nextPage,
      prevPage,
      shouldCountSkip = false, 
    }) => {
      const router = useRouter();
    
      useEffect(() => {
        let timer;
        if (isRunning && time > 0) {
          timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
          }, 1000);
        } else if (time === 0) {
          clearInterval(timer);
    
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Süre Bitti!',
            text2: 'Pomodoro süresi tamamlandı.',
            text1Style: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            },
            text2Style: {
              fontSize: 12,
              color: 'black',
            },
          });
    
          for (let i = 0; i < 7; i++) {
            setTimeout(() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }, i * 150);
          }
        } else {
          clearInterval(timer);
        }
        return () => clearInterval(timer);
      }, [isRunning, time]);
    
      const toggleTimer = () => {
        setIsRunning(!isRunning);
        setStarted(true);
      };
    
      const resetTimer = () => {
        if (resetTime) {
          setTime(resetTime); 
        } else {
          setTime(0); 
        }
        setIsRunning(false);
        setStarted(false);
      };
    // hem sayaç hem timer
      const handleSkip = async () => {
        if (started && nextPage) {
          try {
            if (shouldCountSkip) {
              const value = await AsyncStorage.getItem('skipCount');
              const count = value ? parseInt(value) : 0;
              const newCount = count + 1;
              await AsyncStorage.setItem('skipCount', newCount.toString());
            }
            router.push(nextPage);
          } catch (e) {
            console.error('Skip count artışı hatası:', e);
          }
        }
      };
    
      return (
        <View style={styles.buttonContainer}>
        
          <TouchableOpacity
            style={[
              styles.smallButton,
              styles.yanbuttons,
              !started && styles.hidden,
              { backgroundColor: buttonColor },
            ]}
            onPress={resetTimer}
            disabled={!started}
          >
            <MaterialCommunityIcons name="restart" size={35} color="black" />
          </TouchableOpacity>
    
      
          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: buttonColor }]}
            onPress={toggleTimer}
          >
            <AntDesign
              name={isRunning ? "pause" : "caretright"}
              size={45}
              color="black"
            />
          </TouchableOpacity>
    
        
          <TouchableOpacity
            style={[
              styles.smallButton,
              styles.yanbuttons,
              !started && styles.hidden,
              { backgroundColor: buttonColor },
            ]}
            onPress={handleSkip}
            disabled={!started}
          >
            <MaterialCommunityIcons name="skip-forward" size={35} color="black" />
          </TouchableOpacity>
    
          <Toast />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      buttonContainer: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        paddingBottom: 20,
      },
      mainButton: { 
        width: 100,
        height: 65,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
      },
      smallButton: {
        width: 70,
        height: 55,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
      },
      yanbuttons: {
        marginTop: 70,
      },
      hidden: {
        opacity: 0,
      },
    });
    
    export default Buttons;