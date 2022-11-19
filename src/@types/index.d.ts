import { Tuple, DefaultMantineColor } from '@mantine/core';

// custom color added to Mantine
type ExtendedCustomColors = 'materialBlue' | DefaultMantineColor;
declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}
