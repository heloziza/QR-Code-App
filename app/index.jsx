import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Index() {
  const router = useRouter();
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrList, setQrList] = useState([]);

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

  // const handleCamera = ( {data} ) => {
  //   setScanned(true)
  //   setQrData(data)
  //   setQrList((prevList) => [...prevList, data])
  //   Alert.alert("QR Code Escaneado",
  //     `Conteúdo: ${data}`,
  //     [
  //       { text: "OK", onPress: () => console.log("OK")}
  //     ]
  //   )
  // }
  // handleBarCodeScanned
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

      <View style={styles.controles}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Inverter Câmera</Text>
        </TouchableOpacity>

        {scanned && (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setScanned(false)}
            >
              <Text style={styles.text}>Escanear Novamente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={irParaHistorico}>
              <Text style={styles.text}>Ver Histórico</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {qrData !== "" && (
        <View style={styles.result}>
          <Text style={styles.resultText}>{qrData}</Text>
        </View>
      )}
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
    alignItems: "center", //alinha verticalmente
    paddingVertical: 10,
    backgroundColor: "white",
  },

  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
  },

  result: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },

  resultText: {
    fontSize: 16,
  },

  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
    fontSize: 24,
  },
});