# 📷 QRCodeScanner  

Este é um aplicativo React Native desenvolvido com **Expo**, que permite a leitura de códigos QR usando a câmera do dispositivo. Além disso, o aplicativo mantém um **histórico** dos códigos escaneados, permitindo acessá-los posteriormente.  

---

## 🚀 **Funcionalidades**  
✅ Escanear QR Codes usando a câmera do dispositivo.  
✅ Salvar automaticamente os QR Codes escaneados no histórico.  
✅ Permitir que o usuário abra links diretamente do histórico.  
✅ Compartilhar links de QR Code escaneados.  
✅ Alternar entre **modo claro e escuro** no histórico.  
✅ Limpar histórico de QR Codes escaneados.  

---

## 🛠 **Tecnologias Utilizadas**  
- **React Native** com **Expo**  
- **expo-camera** → Para acessar a câmera e escanear QR Codes
- **@react-native-async-storage/async-storage** → Para armazenar o histórico dos QR Codes escaneados  

---

## 🐛 **Possíveis Erros e Soluções**  
🔹 **"Câmera não funciona"** → Verifique se a permissão da câmera foi concedida.  
🔹 **"Histórico não atualiza"** → Tente fechar e reabrir o app. O AsyncStorage pode estar carregando dados antigos.  
🔹 **"Erro ao abrir links"** → Alguns links podem ser inválidos. Verifique se o QR Code contém um URL válido.  

---

## 🤝 **Contribuição**
Se quiser contribuir, sinta-se à vontade para fazer um **fork** do repositório, criar uma nova branch e enviar um **pull request**!  

💡 **Sugestões de melhorias são bem-vindas!**  