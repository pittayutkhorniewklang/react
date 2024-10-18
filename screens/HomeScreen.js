import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://w0.peakpx.com/wallpaper/415/865/HD-wallpaper-lone-wolf-nature.jpg' }} // เปลี่ยน URL รูปตามต้องการ
      style={styles.background}
    >
      {/* ลบกรอบดำออก ใช้เพียงข้อความและปุ่ม */}
      <Text style={styles.title}>Welcome to Waste Eye</Text>

      {/* ปุ่มสำหรับกด Scan */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate('ScanScreen')}
      >
        <Icon name="scan-outline" size={30} color="#fff" />
        <Text style={styles.buttonText}>Scan Now</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // ทำให้ภาพเต็มจอ
    height: '100%', // ทำให้ภาพเต็มจอ
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HomeScreen;
