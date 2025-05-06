import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Selections = ({ icon1, iconColor, bgColor, nextPage, pomodoro, showPomodoro = true }) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(parseInt(pomodoro, 10));
  const [skipCount, setSkipCount] = useState(0);
  const [lang, setLang] = useState("tr");

  const totalWork = pomodoroCount * 25;
  const totalBreak = pomodoroCount * 5;
  const totalTime = totalWork + totalBreak;

  useEffect(() => {
    const loadData = async () => {
      try {
        const skip = await AsyncStorage.getItem('skipCount');
        if (skip !== null) setSkipCount(parseInt(skip, 10));

        const storedLang = await AsyncStorage.getItem("language");
        if (storedLang) setLang(storedLang);
      } catch (e) {
        console.error("Veri yüklenirken hata:", e);
      }
    };
    loadData();
  }, []);

  const resetPomodoro = async () => {
    try {
      await AsyncStorage.removeItem('pomodoroCount');
      setPomodoroCount(0);
    } catch (e) {
      console.error('Pomodoro sıfırlanırken hata:', e);
    }
  };

  const resetSkipCount = async () => {
    try {
      await AsyncStorage.setItem('skipCount', '0');
      setSkipCount(0);
    } catch (e) {
      console.error('Skip count sıfırlanırken hata:', e);
    }
  };

  const handleResetAndNavigate = async () => {
    await resetPomodoro();
    await resetSkipCount();
    setModalVisible(false);
    router.push('/(tabs)/MainPage');
  };

  return (
    <View style={[styles.selectionContainer, { backgroundColor: bgColor }]}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push(nextPage)}
        >
          <FontAwesome name={icon1} size={40} color={iconColor} />
        </TouchableOpacity>

        {showPomodoro && (
          <TouchableOpacity style={styles.iconContainer} onPress={() => setModalVisible(true)}>
            <Text style={styles.pomodoroTime}>{pomodoro}</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {lang === "tr" ? "Pomodoro Özetin" : "Your Pomodoro Summary"}
            </Text>
            <Text style={styles.modalText}>
              {lang === "tr" ? "Tamamlanan pomodoro" : "Pomodoros completed"}: {pomodoroCount}
            </Text>
            <Text style={styles.modalText}>
              {lang === "tr" ? "Toplam çalışma süren" : "Total work time"}: {totalWork} dakika
            </Text>
            <Text style={styles.modalText}>
              {lang === "tr" ? "Toplam mola süren" : "Total break time"}: {totalBreak} dakika
            </Text>
            <Text style={styles.modalText}>
              {lang === "tr" ? "Toplam süre" : "Total duration"}: {totalTime} dakika
            </Text>

            <View style={styles.buttonRow}>
              <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>
                  {lang === "tr" ? "Kapat" : "Close"}
                </Text>
              </Pressable>

              <Pressable
                style={styles.modalButton}
                onPress={handleResetAndNavigate}
              >
                <Text style={styles.modalButtonText}>
                  {lang === "tr" ? "Sıfırla" : "Reset"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    width: '100%',
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pomodoroTime: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 32,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingVertical: 5,
    paddingHorizontal: 14,
    overflow: 'hidden',
    backgroundColor: '#e1e1e1',
    padding: 10,
    borderRadius: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
});

export default Selections;
