import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../components/_loadingScreen';
import { Platform } from 'react-native';

const fontMap = Platform.select({
    ios: {
        f1: 'HelveticaNeue',       
        f2: 'Georgia',             
        f3: 'Arial Rounded MT Bold',
        f4: 'Avenir Next',        
        f5: 'Courier New',         
        f6: 'Palatino',             
      },
      
  android: {
    f1: 'sans-serif-thin',
    f2: 'serif',
    f3: 'casual',
    f4: 'avenir',
    f5: 'serif-monospace',
    f6: 'cursive',
  },
});



const translations = {
    en: {
        header: "Change Font",
        toastMessage: "Font Changed: ",
        fontSelected: "You selected '{font}' font.",
        resetMessage: "Default",
    },
    tr: {
        header: "Yazı Tipini Değiştir",
        toastMessage: "Yazı Tipi Değiştirildi: ",
        fontSelected: "'{font}' yazı tipini seçtiniz.",
        resetMessage: "Varsayılan",
    }
};

const ChangeFont = () => {
    const router = useRouter();
    const [selectedKey, setSelectedKey] = useState(null);
    const [language, setLanguage] = useState('en');
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false); 

    useEffect(() => {
        const loadLanguage = async () => {
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
        setTimeout(() => {
            setLoading(false);
        }, 225); // Yükleme süresi

        loadLanguage();
        loadDarkMode();
    }, []);

    useEffect(() => {
        const loadFont = async () => {
            try {
                const savedFont = await AsyncStorage.getItem('selectedFont');
                if (savedFont) {
                    const foundKey = Object.keys(fontMap).find(key => fontMap[key] === savedFont);
                    if (foundKey) setSelectedKey(foundKey);
                }
            } catch (error) {
                console.error(error);
            }
        };
        loadFont();
    }, []);

    const showToast = (font) => {
        Toast.show({
            type: 'success',
            position: 'bottom',
            text1: `${translations[language].toastMessage} ${font}`,
            text2: translations[language].fontSelected.replace('{font}', font),
            visibilityTime: 2000,
            autoHide: true,
        });
    };

    const handleSelect = async (key) => {
        const font = fontMap[key];
        if (!font) return;
        setSelectedKey(key);
        await AsyncStorage.setItem('selectedFont', font);
        showToast(font);
    };

    const handleReset = async () => {
        setSelectedKey(null);
        await AsyncStorage.removeItem('selectedFont');
        showToast(translations[language].resetMessage);
    };

    // Dark mode renkleri
    const backgroundColor = isDarkMode ? '#333' : '#ffffff';
    const textColor = isDarkMode ? '#ffffff' : '#000000'; 
    const iconColor = isDarkMode ? '#ffffff' : '#000000'; 
    const borderColor = isDarkMode ? '#0A0A0A' : '#F0f0f0';
    const buttonBg = isDarkMode ? '#555' : '#e1e1e1';  
    const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content'; 

    if (loading) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent={false} />
                <LoadingScreen color={isDarkMode ? 'white' : 'cyan'} loadingDuration={225} onLoadingComplete={() => setLoading(false)} />
            </SafeAreaView>
        );
    }

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={borderColor} translucent={true} />
            <View style={styles.headerContainer}>
                <TouchableOpacity style={[styles.goBackButton,{ backgroundColor: buttonBg }]} onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={30} color={iconColor} />
                </TouchableOpacity>
                <Text style={[styles.headerText, { fontFamily: 'monospace', color: textColor }]}>
                    {translations[language].header}
                </Text>
                <TouchableOpacity style={[styles.resetButton ,{ backgroundColor: buttonBg }]} onPress={handleReset}>
                    <MaterialCommunityIcons name="restore" size={26} color={iconColor} />
                </TouchableOpacity>
            </View>

            <View style={styles.fontOptions}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handleSelect('f1')}>
                        <ImageBackground
                            source={require('../../assets/images/font1.png')}
                            style={[styles.fontOption, selectedKey === 'f1' && styles.selectedOption]}
                            imageStyle={{ borderRadius: 8 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSelect('f2')}>
                        <ImageBackground
                            source={require('../../assets/images/font2.png')}
                            style={[styles.fontOption, selectedKey === 'f2' && styles.selectedOption]}
                            imageStyle={{ borderRadius: 8 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handleSelect('f3')}>
                        <ImageBackground
                            source={require('../../assets/images/font3.png')}
                            style={[styles.fontOption, selectedKey === 'f3' && styles.selectedOption]}
                            imageStyle={{ borderRadius: 8 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSelect('f4')}>
                        <ImageBackground
                            source={require('../../assets/images/font4.png')}
                            style={[styles.fontOption, selectedKey === 'f4' && styles.selectedOption]}
                            imageStyle={{ borderRadius: 8 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => handleSelect('f5')}>
                        <ImageBackground
                            source={require('../../assets/images/font5.png')}
                            style={[styles.fontOption, selectedKey === 'f5' && styles.selectedOption]}
                            imageStyle={{ borderRadius: 8 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSelect('f6')}>
                        <ImageBackground
                            source={require('../../assets/images/font5.png')}
                            style={[styles.fontOption, selectedKey === 'f6' && styles.selectedOption]}
                            imageStyle={{ borderRadius: 15 }}
                        />
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
        borderBottomColor: '#060606',
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    goBackButton: {
        backgroundColor: '#e1e1e1',
        padding: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resetIcon: {
        padding: 10,
        backgroundColor: '#eaeaea',
        borderRadius: 50,
    },
    fontOptions: {
        marginTop: 20,
    },
    fontOption: {
        padding: 20,
        width: 140,
        height: 200,
        marginVertical: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    selectedOption: {
        borderColor: '#000',
        borderWidth: 4,
    },
    resetButton: {
        backgroundColor: '#e1e1e1',
        padding: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 50,
        paddingVertical: 15,
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChangeFont;
