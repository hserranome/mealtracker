import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export type InputContainerProps = {
  name: string;
  label?: string;
  error?: string;
  children: ReactNode;
  direction?: 'vertical' | 'horizontal';
};

export const InputContainer = ({
  name,
  label,
  error,
  children,
  direction = 'vertical',
}: InputContainerProps) => {
  const { styles } = useStyles(inputContainerStyleSheet, {
    direction,
  });

  return (
    <View key={name} style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
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
