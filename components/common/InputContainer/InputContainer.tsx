import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export type InputContainerProps = {
  name: string;
  label?: string;
  error?: string;
  children: ReactNode;
};

export const InputContainer = ({ name, error, children }: InputContainerProps) => {
  const { styles } = useStyles(TextInputStyleSheet);

  return (
    <React.Fragment key={name}>
      <>{children}</>
      {error && <Text style={styles.errorContainer}>{error}</Text>}
    </React.Fragment>
  );
};

export const TextInputStyleSheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorContainer: {
    color: theme.colors.red,
  },
}));
