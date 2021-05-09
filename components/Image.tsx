import React from 'react';
import { Image as DefaultImage, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Colors from '../constants/Colors';

enum ImageTypes {
  Rounded = 'rounded',
  Square = 'square'
}

interface Props {
  use?: 'rounded' | 'square';
  src?: string;
  width?: number;
  height?: number;
}

export type ImageProps = Props & View['props'];

const Image = (props: ImageProps) => {
  const { style, use = ImageTypes.Square, src, width = 150, height = 150, ...otherProps } = props;

  const _styles = StyleSheet.create({
    imageContainer: {
      backgroundColor: Colors.bgLight,
      width: width,
      height: height
    },
    image: {
      width: width,
      height: height,
      resizeMode: 'cover',
      borderRadius: use === ImageTypes.Square ? 5 : 50
    }
  });

  const imageStyles: StyleProp<ViewStyle> = [_styles.imageContainer];

  if (use === ImageTypes.Square) {
    imageStyles.push({
      borderRadius: 5
    });
  }

  if (use === ImageTypes.Rounded) {
    imageStyles.push({
      borderStyle: 'solid',
      borderWidth: 5,
      borderColor: Colors.white,
      borderRadius: 75,

      shadowColor: "#656565",
      shadowRadius: 20,
      shadowOpacity: 0.15,
      shadowOffset: {
        width: 0,
        height: 4
      },

      overflow: 'hidden'
    });
  }

  if (style) {
    imageStyles.push(style);
  }

  return (
    <View style={imageStyles} {...otherProps}>
      {src && (
        <DefaultImage
          style={_styles.image}
          source={{
            uri: src
          }}
        />
      )}
    </View>
  );
};

export default Image;
