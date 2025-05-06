import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingScreen = ({ backgroundImage, loadingDuration, onLoadingComplete, color, backgroundColor }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, [loadingDuration, onLoadingComplete]);

  return (
    <ImageBackground source={backgroundImage} style={[styles.imageBackground, { backgroundColor }]}>
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/loading.json')} 
          autoPlay
          loop
          style={{ width: 325, height: 325 }}
        />

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingAnimation: {
    width: 200,
    height: 150,
  },
});

export default LoadingScreen;
