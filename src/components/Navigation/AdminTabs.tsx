import type { ReactNode } from 'react';
import { useRouter } from 'next/router';
import {
  Tabs as MantineTabs,
  Text as MantineText,
  Tooltip as MantineTooltip,
  createStyles,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import Content from '../Layout/Content';
import { adminLinks } from '../../constants/links';

const useStyles = createStyles((theme) => ({
  root: {
    height: '100%',
  },
  tabsList: {
    borderColor: [theme.colors[theme.primaryColor][7]],

    [theme.fn.largerThan('sm')]: {
      width: '16rem',
    },

    [theme.fn.smallerThan('sm')]: {
      borderBottomWidth: 'thin',
      borderBottomStyle: 'solid',
    },
  },
  tab: {
    '&[data-active]': {
      borderColor: [theme.colors[theme.primaryColor][7]],
    },

    '&:hover:not([data-active])': {
      borderColor: [theme.colors.gray[4]],
    },

    [theme.fn.smallerThan('sm')]: {
      margin: 0,
      padding: '1rem',

      '&:hover:not([data-active])': {
        backgroundColor: [theme.colors.gray[2]],
      },
    },
  },
  tabLabel: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  tabIcon: {
    width: '2rem',
    height: '2rem',

    '&:not(:only-child)': {
      marginRight: '1rem',
    },

    [theme.fn.smallerThan('sm')]: {
      '&:not(:only-child)': {
        margin: '0',
      },
    },
  },
  content: {
    [theme.fn.largerThan('lg')]: {
      paddingRight: '16rem',
    },
  },
}));

type AdminTabsProps = {
  children?: ReactNode;
};

const AdminTabs = ({ children }: AdminTabsProps) => {
  const router = useRouter();
  const { classes } = useStyles();
  const matches = useMediaQuery('(max-width: 768px)', true, {
    getInitialValueInEffect: false,
  });

  const tabsJSX = (
    <>
      {adminLinks.map((link) => (
        <MantineTooltip
          key={link.url}
          label={link.title}
          color="materialBlue"
          withArrow
          position="bottom"
          hidden={!matches}
          events={{ hover: true, focus: true, touch: false }}
        >
          <MantineTabs.Tab
            value={link.url}
            icon={link.icon}
            mb="xs"
            aria-label={link.title}
          >
            <MantineText fz="sm">{link.title}</MantineText>
          </MantineTabs.Tab>
        </MantineTooltip>
      ))}
    </>
  );

  return (
    <>
      <MantineTabs
        classNames={{
          root: classes.root,
          tabsList: classes.tabsList,
          tab: classes.tab,
          tabLabel: classes.tabLabel,
          tabIcon: classes.tabIcon,
        }}
        variant={matches ? 'pills' : 'outline'}
        orientation={matches ? 'horizontal' : 'vertical'}
        value={router.pathname}
        onTabChange={(value) => router.push(value as string)}
        activateTabWithKeyboard={false}
      >
        <MantineTabs.List
          position={matches ? 'center' : 'left'}
          pt="xs"
          pb="xs"
          pl={matches ? '0' : 'xs'}
          aria-label="Admin control tabs"
        >
          {tabsJSX}
        </MantineTabs.List>

        <MantineTabs.Panel value={router.pathname}>
          <Content className={classes.content} mt="md">
            {children}
          </Content>
        </MantineTabs.Panel>
      </MantineTabs>
    </>
  );
};

export default AdminTabs;
