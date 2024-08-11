import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FC, PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ProgressBar } from '~/components/elements/ProgressBar';

export const OnboardingScreenContainer: FC<
  PropsWithChildren<{
    title: string | null;
    progress: number | null;
  }>
> = ({ title, progress, children }) => {
  const { theme, styles } = useStyles(stylesheet);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.icon}>
            <Feather name="arrow-left" size={32} color={theme.colors.base800} />
          </TouchableOpacity>
          <Text style={[theme.fonts.heading.m, styles.title]}>{title}</Text>
        </View>
        <View style={styles.progressBarContainer}>
          {progress && <ProgressBar progress={progress} />}
        </View>
      </View>
      {children}
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: { flex: 1 },
  header: { paddingHorizontal: theme.margins[16] },
  titleBar: { flexDirection: 'row', alignItems: 'center' },
  progressBarContainer: {
    marginTop: theme.margins[8],
    height: 10,
  },
  icon: {
    marginRight: theme.margins[14],
  },
  title: {
    color: theme.colors.base800,
  },
}));
