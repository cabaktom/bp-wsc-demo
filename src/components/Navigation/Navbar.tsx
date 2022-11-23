import React, { Dispatch, SetStateAction } from 'react';
import { Header as MantineHeader, createStyles } from '@mantine/core';
import links from '../../constants/links';
import NavLink from './NavLink';
import Burger from '../Button/Burger';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: [
      theme.colors[theme.primaryColor][Number(theme.primaryShade)], // TODO: Don't use casting
    ],
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
        theme.fn.darken(
          theme.colors[theme.primaryColor][Number(theme.primaryShade)], // TODO: Don't use casting
          0.15,
        ),
      ],
    },
    '&:active': {
      backgroundColor: [
        theme.fn.darken(
          theme.colors[theme.primaryColor][Number(theme.primaryShade)], // TODO: Don't use casting
          0.35,
        ),
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
    <MantineHeader height={50} className={classes.header}>
      <Burger opened={opened} setOpened={setOpened} />
      <ul className={classes.links}>{navLinksJSX}</ul>
    </MantineHeader>
  );
};

export default Navbar;
