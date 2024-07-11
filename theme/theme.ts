const constants = {
  margins: {
    1: 1,
    2: 2,
    4: 4,
    6: 6,
    8: 8,
    10: 10,
    12: 12,
    14: 14,
    16: 16,
    18: 18,
    20: 20,
    24: 24,
    32: 32,
    40: 40,
    48: 48,
    56: 56,
    64: 64,
    72: 72,
    80: 80,
    96: 96,
  },
  radius: {
    1: 1,
    2: 2,
    5: 5,
    4: 4,
    6: 6,
  },
  fonts: {
    heading: {
      xxs: {
        fontFamily: 'Inter',
        fontWeight: '800',
        fontSize: 16,
        lineHeight: 16 * 1.4,
      },
      xs: {
        fontFamily: 'Inter',
        fontWeight: '800',
        fontSize: 20,
        lineHeight: 20 * 1.4,
      },
      m: {
        fontFamily: 'Inter',
        fontWeight: '800',
        fontSize: 32,
        lineHeight: 32 * 1.3,
      },
      xl: {
        fontFamily: 'Inter',
        fontWeight: '800',
        fontSize: 48,
        lineHeight: 48 * 1.2,
        letterSpacing: 48 * 0.01,
      },
      xxl: {
        fontFamily: 'Inter',
        fontWeight: '800',
        fontSize: 56,
        lineHeight: 56 * 1.2,
        letterSpacing: 56 * 0.01,
      },
    },
    body: {
      m: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 16 * 1.5,
        letterSpacing: 16 * 0.01,
      },
      xl: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 22,
        lineHeight: 24 * 1.6,
        letterSpacing: 22 * 0.01,
      },
    },
  },
  components: {
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: 24,
    },
  },
} as const;

export const lightTheme = {
  ...constants,
  colors: {
    white: '#ffffff',
    blue: '#34AFF7',
    base200: '#EDF0F7',
    base400: '#CBD2E0',
    base600: '#717D96',
    base800: '#2D3648',
  },
} as const;
