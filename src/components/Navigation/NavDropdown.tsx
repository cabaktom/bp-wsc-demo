import React, { Dispatch, SetStateAction } from 'react';
import { createStyles, Navbar as MantineNavbar } from '@mantine/core';
import links from '../../constants/links';
import NavLink from './NavLink';

const useStyles = createStyles((theme) => ({
  navbar: {
    height: 'max-content',
    background: [theme.fn.rgba(theme.white, 0.95)],
    backdropFilter: 'blur(0.95rem)',
    borderBottom: `.2rem solid ${[
      theme.colors[theme.primaryColor][Number(theme.primaryShade)], // TODO: Don't use casting
    ]}`,
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  links: {
    minWidth: '30rem',
    margin: '1.75rem auto 2.5rem auto',
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',

    '&:hover a:not(:hover)': {
      borderColor: 'transparent',
    },

    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      padding: '0 2.5rem',
    },
  },
  link: {
    '&:link, &:visited': {
      display: 'block',
      fontWeight: 'bold',
      padding: '1rem 1rem',
      marginBottom: '-.1rem',
      border: '.1rem solid transparent',
      borderBottom: `.1rem solid ${[theme.colors[theme.primaryColor][2]]}`,
      color: [theme.colors[theme.primaryColor][Number(theme.primaryShade)]], // TODO: Don't use casting
    },

    transition: 'all .35s',

    '&:hover, &.activeLink': {
      border: `.1rem solid ${[theme.colors[theme.primaryColor][2]]}`,
    },
    '&:hover': {
      paddingLeft: '1.75rem',
    },
    '&:active': {
      paddingLeft: '1.25rem',
    },
  },
}));

type NavDropdownProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const NavDropdown = ({ opened, setOpened }: NavDropdownProps) => {
  const { classes } = useStyles();

  const navLinksJSX = links.map((link) => (
    <li key={link.url}>
      <NavLink className={classes.link} title={link.title} url={link.url} />
    </li>
  ));

  return (
    <>
      <MantineNavbar className={classes.navbar} hidden={!opened}>
        <ul className={classes.links} onClick={() => setOpened(false)}>
          {navLinksJSX}
        </ul>
      </MantineNavbar>
    </>
  );
};

export default NavDropdown;
