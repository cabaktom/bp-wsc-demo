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

// Next.js page with custom layout to be able to use 2 layouts in the same page
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// sort status for useSort hook
type SortStatus = {
  accessor: string;
  direction: 'asc' | 'desc';
};

// TipTap image type extension
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       */
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        width?: number;
        margin?: number;
      }) => ReturnType;
    };
  }
}
