import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  // ฟังก์ชันสำหรับขอสิทธิ์การใช้งานกล้อง
  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission(); // เรียกใช้งานเมื่อ component ถูก mount
  }, []);

  // ฟังก์ชันนี้จะถูกเรียกเมื่อกล้องพร้อมใช้งาน
  const handleCameraReady = () => {
    setIsCameraReady(true);
    console.log('Camera is ready');
  };

  const handleMountError = (error) => {
    console.error('Camera mount error:', error);
  };

  const takePicture = async () => {
    if (isCameraReady && cameraRef.current) {
      console.log('Taking picture...');
      const options = { quality: 0.5, base64: true };
      try {
        const data = await cameraRef.current.takePictureAsync(options);
        console.log('Picture taken! URI:', data.uri);
      } catch (error) {
        console.error('Failed to take picture:', error);
      }
    } else {
      console.warn('Camera is not ready yet');
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={true} // ถ้าต้องการบันทึกเสียงขณะถ่ายวิดีโอ
        onCameraReady={handleCameraReady}
        onMountError={handleMountError} // เพิ่มการตรวจจับข้อผิดพลาดขณะ mount
      />
      <View style={styles.captureContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.captureButton} disabled={!isCameraReady}>
          <Text style={styles.captureText}>{isCameraReady ? 'Capture' : 'Camera is not ready'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  captureButton: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  captureText: {
    fontSize: 14,
  },
});

export default CameraScreen;
