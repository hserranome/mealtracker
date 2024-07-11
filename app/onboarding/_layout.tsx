import { Feather } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { FC, PropsWithChildren, useContext } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { OnboardingDataProvider } from '~/components/OnboardingDataProvider';
import {
  OnboardingParamsContext,
  OnboardingParamsProvider,
} from '~/components/OnboardingParamsProvider';
import { ProgressBar } from '~/components/ProgressBar';

const LayoutWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { theme, styles } = useStyles(stylesheet);
  const { screenParams: screen } = useContext(OnboardingParamsContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.icon}>
            <Feather name="arrow-left" size={32} color={theme.colors.base800} />
          </TouchableOpacity>
          <Animated.Text
            entering={FadeIn}
            exiting={FadeOut}
            style={[theme.fonts.heading.m, styles.title]}>
            {screen.title}
          </Animated.Text>
        </View>
        <View style={styles.progressBarContainer}>
          {screen.progress && <ProgressBar progress={screen.progress} />}
        </View>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default function Layout() {
  const { styles } = useStyles(stylesheet);
  return (
    <OnboardingParamsProvider>
      <OnboardingDataProvider>
        <LayoutWrapper>
          <Stack screenOptions={{ headerShown: false, contentStyle: styles.container }} />
        </LayoutWrapper>
      </OnboardingDataProvider>
    </OnboardingParamsProvider>
  );
}

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
