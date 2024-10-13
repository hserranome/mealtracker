import { ReactNode } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export type InputContainerProps = {
  label?: string;
  error?: string;
  children: ReactNode;
  direction?: 'vertical' | 'horizontal';
  labelStyle?: StyleProp<TextStyle>;
};

export const InputContainer = ({
  label,
  error,
  children,
  direction = 'vertical',
  labelStyle,
}: InputContainerProps) => {
  const { styles } = useStyles(inputContainerStyleSheet, {
    direction,
  });

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.children}>{children}</View>
      {error && <Text style={styles.errorContainer}>{error}</Text>}
    </View>
  );
};

const inputContainerStyleSheet = createStyleSheet((theme) => ({
  container: {
    variants: {
      direction: {
        vertical: {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
        horizontal: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
    },
  },
  label: {
    ...theme.fonts.body.m,
    color: theme.colors.base800,
    variants: {
      direction: {
        vertical: {
          marginBottom: theme.margins[8],
        },
        horizontal: {
          marginLeft: theme.margins[4],
          marginRight: theme.margins[16],
        },
      },
    },
  },
  children: {
    variants: {
      direction: {
        vertical: {
          width: '100%',
        },
        horizontal: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginRight: theme.margins[4],
        },
      },
    },
  },
  errorContainer: {
    ...theme.fonts.body.xs,
    color: theme.colors.red,
    marginTop: theme.margins[4],
  },
}));
