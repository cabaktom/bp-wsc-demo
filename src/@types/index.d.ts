import type { ReactElement, ReactNode } from 'react';
import type { Tuple, DefaultMantineColor } from '@mantine/core';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type SortStatus = {
  accessor: string;
  direction: 'asc' | 'desc';
};
