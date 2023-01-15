import { Tuple, DefaultMantineColor } from '@mantine/core';
import { DefaultSession } from 'next-auth';

// custom color added to Mantine
type ExtendedCustomColors =
  | 'materialBlue'
  | 'materialOrange'
  | DefaultMantineColor;
declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

export type MySession = DefaultSession & {
  user?: {
    username: string;
  };
};
