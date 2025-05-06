import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import LoadingScreen from '../components/_loadingScreen';

const ChangeColor = () => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState('black');
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStoredColor = async () => {
      const storedColor = await AsyncStorage.getItem('selectedColor');
      if (storedColor) {
        setSelectedColor(storedColor);
      }

      setTimeout(() => {
        setLoading(false);
      }, 225); //süre
    };

    const getLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage) {
        setLanguage(storedLanguage); 
      }
    };

    const loadDarkMode = async () => {
      const storedDarkMode = await AsyncStorage.getItem('darkMode');
      if (storedDarkMode) {
        setIsDarkMode(storedDarkMode === 'true');
      }
    };
    getStoredColor();
    getLanguage();
    loadDarkMode();
  }, []);

  const handleColorChange = async (color) => {
    setSelectedColor(color);
    await AsyncStorage.setItem('selectedColor', color);

    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: language === 'en' ? `Color Changed to ${color}` : `Renk ${color} Olarak Değiştirildi`,
      text2: language === 'en' ? `You have selected the ${color} color.` : `${color} rengini seçtiniz.`,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const handleReset = async () => {
    await AsyncStorage.setItem('selectedColor', 'black');
    setSelectedColor('black');

    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: language === 'en' ? 'Color Reset to Black' : 'Renk Siyaha Sıfırlandı',
      text2: language === 'en' ? 'The color has been reset to black.' : 'Renk siyaha sıfırlandı.',
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const Color =
    selectedColor === 'cyan' ? '#00BCD4' :
      selectedColor === 'blue' ? '#1976D2' :
        selectedColor === 'green' ? '#388E3C' :
          selectedColor === 'pink' ? '#D81B60' :
            selectedColor === 'red' ? '#F44336' :
              selectedColor === 'yellow' ? '#FFEB3B' :
                selectedColor === 'white' ? '#FFFFFF' :
                  selectedColor === 'gray' ? '#9E9E9E' :
                    '#0A0A0A';  

  const backgroundColor = isDarkMode ? '#333' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#000000'; 
  const iconColor = isDarkMode ? '#ffffff' : '#000000'; 
  const borderColor = isDarkMode ? '#0A0A0A' : '#F0f0f0';
  const buttonBg = isDarkMode ? '#555' : '#e1e1e1';  
  const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content'; 

  if (loading) {
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
            <StatusBar barStyle={statusBarStyle} backgroundColor="transparent" translucent={false} />
            <LoadingScreen color={isDarkMode ? 'white' : 'cyan'} loadingDuration={225} onLoadingComplete={() => setLoading(false)} />
        </SafeAreaView>
    );
}

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Color} translucent={true} />

      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.goBackButton, { backgroundColor: buttonBg }]} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={30} color={iconColor} />
        </TouchableOpacity>

        <Text style={[styles.headerText, { color: textColor }]}>{language === 'en' ? 'Change Color' : 'Renk Değiştir'}</Text>

        <TouchableOpacity style={[styles.resetButton, { backgroundColor: buttonBg }]} onPress={handleReset}>
          <MaterialCommunityIcons name="restore" size={28} color={iconColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.colorOptions}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleColorChange('cyan')}>
            <ImageBackground source={require('../../assets/images/colorCyan.png')} style={[styles.colorOption, { borderColor: selectedColor === 'cyan' ? borderColor : 'transparent' }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleColorChange('blue')}>
            <ImageBackground source={require('../../assets/images/colorBlue.png')} style={[styles.colorOption, { borderColor: selectedColor === 'blue' ? borderColor : 'transparent' }]} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleColorChange('green')}>
            <ImageBackground source={require('../../assets/images/colorGreen.png')} style={[styles.colorOption, { borderColor: selectedColor === 'green' ? borderColor : 'transparent' }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleColorChange('pink')}>
            <ImageBackground source={require('../../assets/images/colorPink.png')} style={[styles.colorOption, { borderColor: selectedColor === 'pink' ? borderColor : 'transparent' }]} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleColorChange('red')}>
            <ImageBackground source={require('../../assets/images/colorRed.png')} style={[styles.colorOption, { borderColor: selectedColor === 'red' ? borderColor : 'transparent' }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleColorChange('yellow')}>
            <ImageBackground source={require('../../assets/images/colorYellow.png')} style={[styles.colorOption, { borderColor: selectedColor === 'yellow' ? borderColor : 'transparent' }]} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleColorChange('white')}>
            <ImageBackground source={require('../../assets/images/colorWhite.png')} style={[styles.colorOption, { borderColor: selectedColor === 'white' ? borderColor : 'transparent' }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleColorChange('gray')}>
            <ImageBackground source={require('../../assets/images/colorGray.png')} style={[styles.colorOption, { borderColor: selectedColor === 'gray' ? borderColor : 'transparent' }]} />
          </TouchableOpacity>
        </View>
      </View>

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  goBackButton: {
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOptions: {
    marginTop: 20,
  },
  colorOption: {
    padding: 20,
    width: 140,
    height: 200,
    marginVertical: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 50,
    paddingVertical: 15,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChangeColor;
