  import React, { createContext, useState, useEffect } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const ThemeContext = createContext();

  export const ThemeProvider = ({ children }) => {
    const [selectedBg, setSelectedBg] = useState('whiteBg');
    const [selectedColor, setSelectedColor] = useState('black');
    const [selectedFont, setSelectedFont] = useState('Arial');
    const [language, setLanguage] = useState('en');


    useEffect(() => {
      const getSavedSettings = async () => {
        try {
          const savedBg = await AsyncStorage.getItem('background');
          const savedColor = await AsyncStorage.getItem('color');
          const savedFont = await AsyncStorage.getItem('font');
          const savedLanguage = await AsyncStorage.getItem('language');
        

          if (savedBg) setSelectedBg(savedBg);
          if (savedColor) setSelectedColor(savedColor);
          if (savedFont) setSelectedFont(savedFont);
          if (savedLanguage) setLanguage(savedLanguage);
        
        } catch (error) {
          console.log('Ayarlar yüklenirken hata oluştu:', error);
        }
      };

      getSavedSettings();
    }, []);

  

    const changeBg = async (bg) => {
      setSelectedBg(bg);
      await AsyncStorage.setItem('background', bg);
    };

    const changeColor = async (color) => {
      setSelectedColor(color);
      await AsyncStorage.setItem('color', color);
    };

    const changeFont = async (font) => {
      setSelectedFont(font);
      await AsyncStorage.setItem('font', font);
    };

    const toggleLanguage = async () => {
      const newLanguage = language === 'en' ? 'tr' : 'en';
      setLanguage(newLanguage);
      await AsyncStorage.setItem('language', newLanguage);
    };

    return (
      <ThemeContext.Provider
        value={{
          selectedBg,
          setSelectedBg,
          selectedColor,
          setSelectedColor,
          selectedFont,
          setSelectedFont,
          language,
          setLanguage,
          changeBg,
          changeColor,
          changeFont,
          toggleLanguage,

        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  };

  export const useTheme = () => React.useContext(ThemeContext);
