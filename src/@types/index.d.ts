import { ReactElement, ReactNode } from 'react';
import { Tuple, DefaultMantineColor } from '@mantine/core';
import { NextPage } from 'next';
import { DefaultSession } from 'next-auth';
import { AppProps } from 'next/app';

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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
