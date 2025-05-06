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

    const bgImages = [
        { source: require('../../assets/images/bg1.png') },
        { source: require('../../assets/images/bg2.png') },
        { source: require('../../assets/images/bg3.png') },
        { source: require('../../assets/images/bg4.png') },
        { source: require('../../assets/images/bg5.png') },
        { source: require('../../assets/images/bg6.png') },
        { source: require('../../assets/images/bg7.png') },
        { source: require('../../assets/images/bg8.png') },
    ];

    const ChangeBg = () => {
        const router = useRouter();
        const [selectedBg, setSelectedBg] = useState('bg6');
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

            const loadSelectedBg = async () => {
                const stored = await AsyncStorage.getItem('selectedBg');
                if (stored) setSelectedBg(stored);

                setTimeout(() => {
                    setLoading(false);
                }, 225);
            };

            const loadDarkMode = async () => {
                const storedDarkMode = await AsyncStorage.getItem('darkMode');
                if (storedDarkMode) {
                    setIsDarkMode(storedDarkMode === 'true');
                }
            };

            loadLanguage();
            loadSelectedBg();
            loadDarkMode();
        }, []);

        const handleSelectBg = async (index) => {
            const bgKey = `bg${index}`;
            setSelectedBg(bgKey);
            await AsyncStorage.setItem('selectedBg', bgKey);
            Toast.show({
                type: 'success',
                text1: language === 'en' ? 'All Set!' : 'Her Şey Ayarlandı!',
                text2: language === 'en' ? 'Your background has been updated. Enjoy the new look!' : 'Arka planınız güncellendi. Yeni görünümün tadını çıkarın!',
                position: 'bottom',
                visibilityTime: 2000,
                autoHide: true,
                style: styles.toastStyle,
                textStyle: styles.toastTextStyle,
            });
        };

        const handleReset = async () => {
            setSelectedBg('bg9');
            await AsyncStorage.removeItem('selectedBg');
            Toast.show({
                type: 'info',
                text1: language === 'en' ? 'Back to Default' : 'Varsayılana Dön',
                text2: language === 'en' ? 'The background has been restored to the default. A clean start!' : 'Arka plan varsayılana döndü. Temiz bir başlangıç!',
                position: 'bottom',
                visibilityTime: 2000,
                autoHide: true,
                style: styles.toastStyle,
                textStyle: styles.toastTextStyle,
            });
        };

        const backgroundColor = isDarkMode ? '#333' : '#ffffff';
        const headerTextColor = isDarkMode ? '#ffffff' : '#000000';
        const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content'; 
        const borderColor = isDarkMode ? '#f0f0f0' : '#0A0A0A';
        const buttonBg = isDarkMode ? '#555' : '#e1e1e1';  

        if (loading) {
            return (
                <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
                    <StatusBar barStyle={statusBarStyle} backgroundColor="transparent" translucent={false} />
                    <LoadingScreen color={isDarkMode ? 'white' : 'cyan'} loadingDuration={225} onLoadingComplete={() => setLoading(false)} />
                </SafeAreaView>
            );
        }

        return (
            <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
                <StatusBar barStyle={statusBarStyle} backgroundColor={isDarkMode ? '#333' : '#fff'} translucent />

                <View style={styles.headerContainer}>
                    <TouchableOpacity style={[styles.goBackButton, { backgroundColor: buttonBg }]} onPress={() => router.back()}>
                        <MaterialCommunityIcons name="arrow-left" size={30} color={isDarkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <Text style={[styles.headerText, { color: headerTextColor }]}>
                        {language === 'en' ? 'Change Background' : 'Arka Planı\nDeğiştir'}
                    </Text>
                    <TouchableOpacity style={[styles.resetButton, { backgroundColor: buttonBg }]} onPress={handleReset}>
                        <MaterialCommunityIcons name="restore" size={26} color={isDarkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.bgOptions}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => handleSelectBg(1)}>
                            <ImageBackground
                                source={require("../../assets/images/bg1.png")}
                                style={[styles.bgOption, selectedBg === "bg1" && { borderColor: borderColor, borderWidth: 4 }]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSelectBg(2)}>
                            <ImageBackground
                                source={require("../../assets/images/bg2.png")}
                                style={[styles.bgOption, selectedBg === "bg2" && { borderColor: borderColor, borderWidth: 4 }]}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => handleSelectBg(3)}>
                            <ImageBackground
                                source={require("../../assets/images/bg3.png")}
                                style={[styles.bgOption, selectedBg === "bg3" && { borderColor: borderColor, borderWidth: 4 }]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSelectBg(4)}>
                            <ImageBackground
                                source={require("../../assets/images/bg4.png")}
                                style={[styles.bgOption, selectedBg === "bg4" && { borderColor: borderColor, borderWidth: 4 }]}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => handleSelectBg(5)}>
                            <ImageBackground
                                source={require("../../assets/images/bg5.png")}
                                style={[styles.bgOption, selectedBg === "bg5" && { borderColor: borderColor, borderWidth: 4 }]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSelectBg(6)}>
                            <ImageBackground
                                source={require("../../assets/images/bg6.png")}
                                style={[styles.bgOption, selectedBg === "bg6" && { borderColor: borderColor, borderWidth: 4 }]}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => handleSelectBg(7)}>
                            <ImageBackground
                                source={require("../../assets/images/bg7.png")}
                                style={[styles.bgOption, selectedBg === "bg7" && { borderColor: borderColor, borderWidth: 4 }]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSelectBg(8)}>
                            <ImageBackground
                                source={require("../../assets/images/bg8.png")}
                                style={[styles.bgOption, selectedBg === "bg8" && { borderColor: borderColor, borderWidth: 4 }]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>


                <Toast position="bottom" />
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
            fontSize: 28,
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
        bgOptions: {
            marginTop: 20,
            width: '100%',
            justifyContent: 'center',
        },
        bgOption: {
            width: 140,
            height: 200,
            borderRadius: 8,
            overflow: 'hidden',
            marginBottom: 10,
            justifyContent: 'center',
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 50,
            marginBottom: 15,
        },
        toastStyle: {
            backgroundColor: '#4CAF50',
            borderRadius: 10,
            padding: 15,
            marginBottom: 10,
            width: '90%',
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 5,
        },
        toastTextStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '500',
            textAlign: 'center',
        },
        safeArea: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    export default ChangeBg;
