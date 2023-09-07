import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

const placeholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState(null)

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(result)
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      console.log("You did not pick the image");
    }
  };

  const onSaveImageAsync = async () => {

  }
  const onReset = () => {
    setShowAppOptions(false)
  }
  const onAddSticker = () => {
    setIsModalVisible(true)
  }
  const onModalClose = () => {
    setIsModalVisible(false)
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={selectedImage ? { uri: selectedImage } : placeholderImage}
        />
        {
          pickedEmoji !== null ? <EmojiSticker stickerSize={40} stickerSource={pickedEmoji} /> : null
        }
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" onPress={onReset} label="Reset"/>
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" onPress={onSaveImageAsync} label="Save"/>
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label={"Choose an Image"}
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label={"Use this Image"}
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 10,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
