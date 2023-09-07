import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const placeholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(result)
      setSelectedImage(result.assets[0].uri);
    } else {
      console.log("You did not pick the image");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={selectedImage ? { uri: selectedImage } : placeholderImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          label={"Choose an Image"}
          theme="primary"
          onPress={pickImageAsync}
        />
        <Button label={"Use this Image"} />
      </View>
      <StatusBar style="auto" />
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
});
