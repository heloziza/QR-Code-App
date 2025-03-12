import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import AsyncStorage  from '@react-native-async-storage/async-storage'
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Index() {
  const router = useRouter();
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrList, setQrList] = useState([]);

  const loadQrList = async () => {
    try {
      const storedQrList = await AsyncStorage.getItem('qrList');
      if (storedQrList) {
        setQrList(JSON.parse(storedQrList)); // Converte de string JSON para array
      }
    } catch (error) {
      console.error('Erro ao carregar qrList do AsyncStorage:', error);
    }
  };

  const saveQrList = async (list) => {
    try {
      await AsyncStorage.setItem('qrList', JSON.stringify(list)); // Converte array para string JSON
    } catch (error) {
      console.error('Erro ao salvar qrList no AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadQrList();
  }, []);

  useEffect(() => {
    saveQrList(qrList);
  }, [qrList]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Precisamos da sua permissão para usar a câmera.
        </Text>
        <Button onPress={requestPermission} title="Conceder permissão"></Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((atual) => (atual === "back" ? "front" : "back"));
  }

  const handleCamera = ({ type, data }) => {
    setScanned(true);
    setQrData(data);
    setQrList((prevList) => [
      ...prevList,
      { url: data, timestamp: new Date().toLocaleString() },
    ]);
    Alert.alert("QR Code Escaneado", `Conteúdo: ${data}`, [
      { text: "OK", onPress: () => console.log("OK pressed") },
    ]);
  };

  const irParaHistorico = () => {
    router.push({
      pathname: "/historico",
      params: {
        qrList: JSON.stringify(qrList),
      },
    });
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleCamera}
      ></CameraView>

      <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
        <Ionicons name="camera-reverse-outline" size={32} color="white" />
        {/* <Text style={styles.text}>Inverter Câmera</Text> */}
      </TouchableOpacity>

      

      

      <View style={styles.controles}>
        {qrList && (
          <TouchableOpacity style={styles.button} onPress={irParaHistorico}>
            <MaterialIcons name="history" size={32} color="white" />
            {/* <Text style={styles.text}>Ver Histórico</Text> */}
          </TouchableOpacity>
        )}
        {scanned && (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setScanned(false)}
            >
              <MaterialCommunityIcons name="qrcode-scan" size={32} color="white" />
              {/* <Text style={styles.text}>Escanear Novamente</Text> */}
            </TouchableOpacity>
          </>
        )}
      </View>

      {qrData !== "" && (
        <View style={styles.result}>
          <Text style={styles.resultText}>{qrData}</Text>
        </View>
      )}

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          Total de QR Codes: {qrList.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 5,
  },

  text: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  controles: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "white",
  },

  button: {
    backgroundColor: "#8f0680",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
  },

  result: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ba0da6",
    alignItems: "center",
    justifyContent: "center",
  },

  resultText: {
    color: "white",
    fontSize: 16,
  },

  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
    fontSize: 24,
  },

  counterContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff82f1",
  },

  counterText: {
    fontSize: 16,
    color: "#8f0680",
  },

  flipButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 10,
  }
});