import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, SafeAreaView, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import LoadingScreen from '../components/_loadingScreen';

const SettingsPage = () => {
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
  const router = useRouter();

  useEffect(() => {
    const getSettings = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        const storedDarkMode = await AsyncStorage.getItem('darkMode'); // Get dark mode preference

        if (storedLanguage !== null) {
          setLanguage(storedLanguage);
        }

        if (storedDarkMode !== null) {
          setIsDarkMode(storedDarkMode === 'true');
        }
      } catch (error) {
        console.log("Error loading settings:", error);
      }

      setTimeout(() => setLoading(false), 225);
    };

    getSettings();
  }, []);

  const handleLoadingComplete = () => setLoading(false);

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'tr' : 'en';
    setLanguage(newLanguage);
    await AsyncStorage.setItem('language', newLanguage);

    Toast.show({
      type: 'success',
      text1: newLanguage === 'en' ? 'Language changed to English' : 'Dil Türkçeye değiştirildi',
      text2: newLanguage === 'en' ? 'The language has been updated to English.' : 'Dil Türkçeye güncellendi.',
      position: 'bottom',
      visibilityTime: 2000,
      autoHide: true,
      style: styles.toastStyle,
      textStyle: styles.toastTextStyle,
    });
  };

  const toggleDarkMode = async () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    await AsyncStorage.setItem('darkMode', newDarkMode.toString()); 

    Toast.show({
      type: 'success',
      text1: language === 'en'
        ? (newDarkMode ? 'Dark Mode Enabled' : 'Dark Mode Disabled')
        : (newDarkMode ? 'Karanlık Mod Etkinleştirildi' : 'Karanlık Mod Devre Dışı Bırakıldı'),

      text2: language === 'en'
        ? (newDarkMode ? 'You are now in dark mode.' : 'You are now in light mode.')
        : (newDarkMode ? 'Artık karanlık moddasınız.' : 'Artık aydınlık moddasınız.'),
    
    
      position: 'bottom',
      visibilityTime: 2000,
      autoHide: true,
      style: styles.toastStyle,
      textStyle: styles.toastTextStyle,
    });
  };

  const getLanguageIcon = () => {
    return language === 'en'
      ? require('../../assets/images/usa.png')
      : require('../../assets/images/tr.png');
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor="transparent" translucent={false} />
        <LoadingScreen
          color={"cyan"}
          loadingDuration={225}
          onLoadingComplete={handleLoadingComplete}
          backgroundColor={isDarkMode ? '#333' : '#fff'}
        />
      </SafeAreaView>
    );
  }

  const backgroundColor = isDarkMode ? '#333' : '#ffffff';
  const textColor = isDarkMode ? '#fff' : '#000';
  const iconColor = isDarkMode ? '#fff' : '#000';
  const borderColor = isDarkMode ? '#444' : '#ccc';
  const buttonBg = isDarkMode ? '#555' : '#e1e1e1';


  const switchTrackColor = isDarkMode ? '#474747' : '#474747';
  const switchThumbColor = isDarkMode ? '#ffffff' : '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor }]}>

      <View style={[styles.headerContainer, { borderBottomColor: borderColor }]}>
        <TouchableOpacity style={[styles.topButton, { backgroundColor: buttonBg }]} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={30} color={iconColor} />
        </TouchableOpacity>

        <Text style={[styles.headerText, { color: textColor }]}>{language === 'en' ? 'Settings' : 'Ayarlar'}</Text>

        <TouchableOpacity style={[styles.topButton, { backgroundColor: buttonBg }]} onPress={toggleLanguage}>
          <Image
            source={getLanguageIcon()}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#333" : "#fff"}
        translucent={false}
        hidden={false}
      />


      <TouchableOpacity
        style={[styles.settingItem, { borderBottomColor: borderColor }]}
        onPress={() => router.push('/settingsPages/_changeColor')}
      >
        <Text style={[styles.settingText, { color: textColor }]}>
          {language === 'en' ? 'Change Color' : 'Renk Değiştir'}
        </Text>
        <MaterialCommunityIcons name="arrow-right" size={28} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.settingItem, { borderBottomColor: borderColor }]}
        onPress={() => router.push('/settingsPages/_changeFont')}
      >
        <Text style={[styles.settingText, { color: textColor }]}>
          {language === 'en' ? 'Change Font' : 'Yazı Tipi Değiştir'}
        </Text>
        <MaterialCommunityIcons name="arrow-right" size={28} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.settingItem, { borderBottomColor: borderColor }]}
        onPress={() => router.push('/settingsPages/_changeBg')}
      >
        <Text style={[styles.settingText, { color: textColor }]}>
          {language === 'en' ? 'Change Background' : 'Arka Plan Değiştir'}
        </Text>
        <MaterialCommunityIcons name="arrow-right" size={28} color={iconColor} />
      </TouchableOpacity>

      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, { color: textColor }]}>
          {language === 'en' ? 'Dark Mode' : 'Karanlık Mod'}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: switchTrackColor, true: switchTrackColor }}
          thumbColor={switchThumbColor}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    width: '100%',
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center",
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  topButton: {
    padding: 10,
    borderRadius: 30,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
  },
  switchText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  toastStyle: {
    backgroundColor: '#333',
    borderRadius: 10,
  },
  toastTextStyle: {
    color: '#fff',
  },
});

export default SettingsPage;
