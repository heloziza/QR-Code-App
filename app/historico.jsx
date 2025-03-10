import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Historico() {
  const { qrList } = useLocalSearchParams();
  const [qrListArray, setQrListArray] = useState([]);

  const limparHistorico = () => {
    setQrListArray([]);
    // Opcional: Adicione código para atualizar a lista na tela principal
  };

  const renderItem = async ({ item, index }) => {
    const { url } = item; // Extrai a URL do item
    const validURL = await Linking.canOpenURL(url);

    if (validURL) {
      return (
        <View style={styles.listItem}>
          <Text
            style={[
              styles.listText,
              { color: "blue", textDecorationLine: "underline" },
            ]}
            onPress={() => Linking.openURL(url)}
          >
            {url}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.listItem}>
        <Text style={styles.listText}>{`${index + 1}. ${item}`}</Text>
        <Button title="Limpar Histórico" onPress={limparHistorico} color="red" />
      </View>
    );
  };

  useEffect(() => {
    if (qrList) {
      setQrListArray(JSON.parse(qrList));
    } else {
      setQrListArray([]);
    }
  }, [qrList]); // Executa quando qrList mudar

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Histórico de QR Codes Escaneados</Text>
      <FlatList
        data={qrListArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>Nenhum QR Code escaneado ainda</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listText: {
    fontSize: 16,
  },
});