import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmojiSticker = ({stickerSize, stickerSource}) => {
  return (
    <View style={{top: -350}}>
      <Image source={stickerSource} resizeMode='contain' style={{width: stickerSize, height: stickerSize}}/>
    </View>
  )
}

export default EmojiSticker

const styles = StyleSheet.create({})