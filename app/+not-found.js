import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';  

const NotFound = () => {
  const navigation = useNavigation();
  const [language, setLanguage] = useState('en');  

  useEffect(() => {
    const getLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language'); 
        if (savedLanguage) {
          setLanguage(savedLanguage);  
        }
      } catch (error) {
        console.error('Dil bilgisi yüklenirken hata oluştu:', error);
      }
    };

    getLanguage();
  }, []);


  const texts = {
    en: {
      title: 'Oops!',
      subtitle: "Looks like you're lost...",
      description: "The first rule of 404: You can't talk about the missing page 🤐",
      buttonText: 'Go Back',
    },
    tr: {
      title: 'Oops!',
      subtitle: 'Kaybolmuş gibisin...',
      description: '404’ün ilk kuralı: Kayıp sayfadan asla bahsedemezsin 🤐',
      buttonText: 'Geri Dön',
    }
  };


  const currentText = texts[language] || texts.en;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="emoticon-confused-outline" size={100} color="#fff" />
      <Text style={styles.title}>{currentText.title}</Text>
      <Text style={styles.subtitle}>{currentText.subtitle}</Text>
      <Text style={styles.description}>{currentText.description}</Text>

      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>{currentText.buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#FF3E00',
  },
  subtitle: {
    fontSize: 22,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#FF3E00',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotFound;
