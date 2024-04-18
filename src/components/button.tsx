import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import palette from '@utils/colors';
import dimensions, {mScale, screenHeight, screenWidth} from '@utils/dimensions';
import fonts from '@utils/fonts';

type props = {
  onPress: () => void;
};
const Button: FC<props> = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.8}>
      <View style={styles.parent}>
        <Text style={styles.text}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: screenWidth / 2.75,
    bottom: screenHeight / 20,
  },
  parent: {
    backgroundColor: palette.accent,
    width: mScale(90),
    height: mScale(90),
    borderColor: palette.accent,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: palette.primary,
    fontSize: dimensions.fontSize.xl4,
    fontFamily: fonts.openSans.bold,
  },
});
