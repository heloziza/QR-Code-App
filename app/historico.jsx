import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Linking, Button, Share } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Historico() {
  const [qrListArray, setQrListArray] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Carrega os dados do AsyncStorage ao abrir a tela
  const carregarHistorico = async () => {
    try {
      const storedQrList = await AsyncStorage.getItem("qrList");
      if (storedQrList) {
        setQrListArray(JSON.parse(storedQrList));
      } else {
        setQrListArray([]);
      }
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    }
  };

  useEffect(() => {
    carregarHistorico();
  }, []);

  const limparHistorico = async () => {
    try {
      await AsyncStorage.removeItem("qrList");
      setQrListArray([]);
    } catch (error) {
      console.error("Erro ao limpar histórico:", error);
    }
  };

  const renderItem = ({ item, index }) => {
    const { url } = item;
    return (
      <View style={styles.listItem}>
        <Text
          style={[
            styles.listText,
            darkMode ? styles.listTextDark : styles.listTextLight,
            { color: darkMode ? "lightblue" : "blue", textDecorationLine: "underline" },
          ]}
          onPress={() => Linking.openURL(url)}
          onLongPress={() => Share.share({ message: url })}
        >
          {url}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.historyContainer, darkMode ? styles.historyContainerDark : null]}>
      <Button
        title={darkMode ? "Tema Claro" : "Tema Escuro"}
        onPress={() => setDarkMode(!darkMode)}
        color="#8f0680"
      />
      <Text style={[styles.historyTitle, darkMode ? styles.historyTitleDark : null]}>
        Histórico de QR Codes Escaneados
      </Text>
      <FlatList
        data={qrListArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={[darkMode ? styles.normalTextDark : null]}>Nenhum QR Code escaneado ainda</Text>
        }
      />

      <Button title="Limpar Histórico" onPress={limparHistorico} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  historyContainerDark: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  historyTitleDark: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white"
  },
  normalTextDark: {
    color: "white"
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listItemDark: {
    padding: 10,
    borderBottomWidth: 1,
    color: "white",
    borderBottomColor: "#ccc",
  },
  listText: {
    fontSize: 16,
  },
  listTextDark: {
    color: "white",
    fontSize: 16,
  },
  buttonLimpaHist: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});