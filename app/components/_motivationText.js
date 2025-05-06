import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import motivationsData from '../randomText.json';

const RandomMotivation = ({ name, nameColor, textColor, bgColor }) => {
  const [randomQuote, setRandomQuote] = useState("");
  const [language, setLanguage] = useState('en'); 

  const motivationList = motivationsData.motivationsEN; 

  const getRandomMotivation = (list) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  };

  useEffect(() => {

    const getLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage) {
        setLanguage(storedLanguage); 
      }
    };
    getLanguage();
  }, []);

  useEffect(() => {
 
    let selectedMotivationList;

    if (language === 'en') {
      selectedMotivationList = motivationsData.motivationsEN;
    } else if (language === 'tr') {
      selectedMotivationList = motivationsData.motivationsTR;
    }

    setRandomQuote(getRandomMotivation(selectedMotivationList));
  }, [language]); 

  return (
    <View style={[styles.motivationContainer, { backgroundColor: bgColor }]}>
      <MaterialCommunityIcons name={name} size={24} color={nameColor} />
      <Text style={[styles.motivationText, { color: textColor }]}>
        {randomQuote}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  motivationContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    padding: 7,
    borderRadius: 30,
  },
  motivationText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default RandomMotivation;
