import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC} from 'react';
import dimensions, {mScale} from '@utils/dimensions';
import palette from '@utils/colors';
import fonts from '@utils/fonts';
import {APP_NAME} from '@utils/constants';

type props = {
  heading: string;
  back?: boolean;
  onBackPress?: () => void;
};
const Header: FC<props> = ({heading, back = false, onBackPress}) => {
  return (
    <View
      style={[
        !back && {
          marginLeft: mScale(20),
        },
        styles.headingContainer,
      ]}>
      {back && (
        <TouchableWithoutFeedback onPress={onBackPress}>
          <Image
            source={require('@assets/images/back.png')}
            style={styles.back}
          />
        </TouchableWithoutFeedback>
      )}
      <Text style={styles.heading}>{heading}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headingContainer: {
    marginVertical: mScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: palette.highlight,
    fontSize: dimensions.fontSize.xl3,
    fontFamily: fonts.roboto.bold,
  },
  back: {
    width: mScale(30),
    height: mScale(30),
    marginHorizontal: mScale(10),
  },
});
