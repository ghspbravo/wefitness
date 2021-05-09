import React from 'react';
import { Text as DefaultText } from 'react-native';
import Colors from '../constants/Colors';

enum typoSizes {
  h1 = 'h1',
  h2 = 'h2',
  h6 = 'h6',
  body = 'body'
}

type typoSizesText = 'h1' | 'h2' | 'h6' | 'body';

const fontSizesByTypo = {
  [typoSizes.h1]: 30,
  [typoSizes.h2]: 24,
  [typoSizes.h6]: 16,
  [typoSizes.body]: 14
};

const fontFamilyByTypo = {
  [typoSizes.h1]: 'inter-600',
  [typoSizes.h2]: 'inter-500',
  [typoSizes.h6]: 'inter-500',
  [typoSizes.body]: 'inter-400'
};

type TypoProps = {
  color?: string;
  use?: typoSizesText;
};

type TextProps = TypoProps & DefaultText['props'];

export const Text = (props: TextProps) => {
  const { style, use = typoSizes.body, color, ...otherProps } = props;

  return (
    <DefaultText
      style={[
        { fontSize: fontSizesByTypo[use], fontFamily: fontFamilyByTypo[use] },
        { color: color || Colors.black },
        style
      ]}
      {...otherProps}></DefaultText>
  );
};
