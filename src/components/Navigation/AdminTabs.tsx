import type { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import {
  Tabs as MantineTabs,
  Text as MantineText,
  Tooltip as MantineTooltip,
  createStyles,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { openConfirmModal } from '@mantine/modals';

import Content from '../Layout/Content';
import { adminLinks } from '../../constants/links';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
  },
  tabsList: {
    borderColor: [theme.colors[theme.primaryColor][7]],

    [theme.fn.largerThan('sm')]: {
      position: 'fixed',
      width: '16rem',
      height: 'calc(100% - 5rem)',
    },

    [theme.fn.smallerThan('sm')]: {
      borderBottomWidth: 'thin',
      borderBottomStyle: 'solid',
    },
  },
  panel: {
    [theme.fn.largerThan('sm')]: {
      marginLeft: '16rem',
    },
  },
  tab: {
    '&[data-active]': {
      borderColor: [theme.colors[theme.primaryColor][7]],
    },

    '&:hover:not([data-active])': {
      borderColor: [theme.colors.gray[4]],
    },

    '&:hover:not([data-active]):last-of-type': {
      borderColor: [theme.colors.red[4]],
    },

    '&:last-of-type': {
      color: [theme.colors.red[Number(theme.primaryShade)]],
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
    maxWidth: '140rem',
    marginBottom: '6rem',
    [theme.fn.largerThan('xl')]: {
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
  const matches = useMediaQuery('(min-width: 768px)', false, {
    getInitialValueInEffect: false,
  });

  const openLogoutModal = () =>
    openConfirmModal({
      title: 'Logout',
      centered: true,
      size: 'sm',
      children: (
        <MantineText size="sm">
          Are you sure you want to logout? You will be redirected to the home
          page.
        </MantineText>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        const data = await signOut({ redirect: false });

        const callbackUrl =
          new URL(data.url!).searchParams.get('callbackUrl') ?? '/';
        router.push(callbackUrl);
      },
      groupProps: { spacing: 'xs', noWrap: true },
      confirmProps: { children: 'Log out', color: 'red' },
    });

  const tabsJSX = (
    <>
      {adminLinks.map((link) => (
        <MantineTooltip
          key={link.url}
          label={link.title}
          color={link.title === 'Log out' ? 'red' : 'materialBlue'}
          withArrow
          position="bottom"
          hidden={matches}
          events={{ hover: true, focus: true, touch: false }}
        >
          <MantineTabs.Tab
            value={link.url}
            icon={link.icon}
            aria-label={link.title}
            mb={link.title === 'Log out' ? '0' : 'xs'}
            mt={link.title === 'Log out' ? 'auto' : '0'}
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
          panel: classes.panel,
          tab: classes.tab,
          tabLabel: classes.tabLabel,
          tabIcon: classes.tabIcon,
        }}
        variant={matches ? 'outline' : 'pills'}
        orientation={matches ? 'vertical' : 'horizontal'}
        value={router.pathname}
        onTabChange={(value: string) => {
          if (value === '/logout') openLogoutModal();
          else router.push(value as string);
        }}
        activateTabWithKeyboard={false}
      >
        <MantineTabs.List
          position={matches ? 'left' : 'center'}
          pt="xs"
          pb="xs"
          pl={matches ? 'xs' : '0'}
          aria-label="Admin control tabs"
        >
          {tabsJSX}
        </MantineTabs.List>

        <MantineTabs.Panel value={router.pathname} my="md">
          <Content className={classes.content}>{children}</Content>
        </MantineTabs.Panel>
      </MantineTabs>
    </>
  );
};

export default AdminTabs;
