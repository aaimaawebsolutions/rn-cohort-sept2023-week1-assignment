import { StyleSheet, Image } from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  console.log(placeholderImageSource, "\t", { uri: selectedImage });
  return (
    <Image
      source={selectedImage ? { uri: selectedImage } : placeholderImageSource}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
