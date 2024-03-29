import type { Dispatch, SetStateAction } from 'react';
import { Burger, Header, createStyles } from '@mantine/core';

import links from '../../constants/links';
import NavLink from './NavLink';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: [theme.colors[theme.primaryColor][9]],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
  },
  links: {
    height: '100%',
    display: 'flex',
    listStyle: 'none',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  link: {
    height: '100%',
    padding: '1rem 1rem 1.25rem 1rem',
    display: 'flex',
    alignItems: 'center',
    color: [theme.white],

    transition: 'all .2s',

    '&:hover, &.activeLink': {
      backgroundColor: [
        theme.fn.darken(theme.colors[theme.primaryColor][9], 0.15),
      ],
    },
    '&:active': {
      backgroundColor: [
        theme.fn.darken(theme.colors[theme.primaryColor][9], 0.35),
      ],
    },
  },
}));

type NavbarProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ opened, setOpened }: NavbarProps) => {
  const { classes } = useStyles();

  const navLinksJSX = links.map((link) => (
    <li key={link.url}>
      <NavLink
        className={classes.link}
        onClick={() => setOpened(false)}
        title={link.title}
        url={link.url}
      />
    </li>
  ));

  return (
    <Header height={50} className={classes.header}>
      <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
      <ul className={classes.links}>{navLinksJSX}</ul>
    </Header>
  );
};

export default Navbar;
