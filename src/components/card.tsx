import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import dimensions, {mScale} from '@utils/dimensions';
import palette from '@utils/colors';
import fonts from '@utils/fonts';
import {getDate} from '@utils/helper';

type props = {
  title: string;
  description: string;
  time: string;
};
const Card: FC<props> = ({title, description, time}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.parent}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.time}>{getDate(time)}</Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  parent: {
    width: '46%',
    height: 'auto',
    backgroundColor: palette.highlight,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'transparent',
    paddingTop: mScale(20),
    paddingLeft: mScale(20),
    paddingBottom: mScale(20),
    paddingRight: mScale(10),
    marginLeft: mScale(12),
    marginBottom: mScale(20),
  },
  title: {
    color: palette.primary,
    fontSize: dimensions.fontSize.xl * 0.9,
    fontFamily: fonts.roboto.bold,
    lineHeight: 30,
  },
  description: {
    color: palette.neutral,
    fontSize: dimensions.fontSize.base2,
    fontFamily: fonts.openSans.regular,
    marginVertical: mScale(10),
  },
  time: {
    color: palette.primary,
    fontSize: dimensions.fontSize.lg,
    fontFamily: fonts.openSans.light,
  },
});
