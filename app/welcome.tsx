import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Button } from '~/components/common';

export default function Start() {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();

  const handleNavigateToSetupWeekdays = () => {
    router.push('/setup-weekdays');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.subtitle}>Let's set up your calorie intake.</Text>
      <Button style={styles.button} title="Ok :3" onPress={handleNavigateToSetupWeekdays} />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  title: {
    ...theme.fonts.heading.xl,
    marginTop: '50%',
    textAlign: 'center',
    color: theme.colors.base800,
  },
  subtitle: {
    ...theme.fonts.heading.xs,
    marginTop: theme.margins[24],
    textAlign: 'center',
  },
  button: {
    marginTop: theme.margins[8],
    marginHorizontal: '10%',
    alignSelf: 'center',
    paddingHorizontal: '10%',
  },
}));

// import { Link } from 'expo-router';
// import { Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { createStyleSheet, useStyles } from 'react-native-unistyles';

// import { Button, ButtonType } from '~/components/common/Button';
// import { OnboardingFormStepContainer } from '~/components/onboarding/OnboardingFormStepContainer';

// export default function Start() {
//   const { styles, theme } = useStyles(stylesheet);

//   return (
//     <SafeAreaView style={styles.container}>
//       <OnboardingFormStepContainer
//         content={<Text style={[theme.fonts.heading.xl, styles.title]}>MealTracker</Text>}
//         footer={
//           <View style={styles.buttons}>
//             <Link href={{ pathname: '/onboarding' }} asChild>
//               <Button title="Start now" />
//             </Link>
//             <Link href={{ pathname: '/login' }} asChild>
//               <Button title="Log in" type={ButtonType.Outline} />
//             </Link>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// }

// const stylesheet = createStyleSheet((theme) => ({
//   container: {
//     flex: 1,
//   },
//   title: {
//     marginTop: '40%',
//     textAlign: 'center',
//     color: theme.colors.base800,
//   },
//   buttons: {
//     gap: theme.margins[10],
//   },
// }));
