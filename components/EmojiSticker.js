import { View, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

export default function EmojiSticker({ imageSize, stickerSource }) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  const onDoubleTap = Gesture.Tap().numberOfTaps(2)
    .onEnd(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = scaleImage.value / 2;
      }
    });
  const onDrag = Gesture.Pan()
    .onBegin(() => {
      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onChange((event) => {
      translateX.value = event.translationX + contextX.value;
      translateY.value = event.translationY + contextY.value;
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={onDoubleTap}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </AnimatedView>
    </GestureDetector>
  );
}