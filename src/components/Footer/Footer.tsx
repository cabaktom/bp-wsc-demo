import React from 'react';
import { Container as MantineContainer, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'sticky',
    top: '100vh',
    height: '8rem',
    marginTop: '4rem',
    backgroundColor: [theme.colors[theme.primaryColor][9]],
    [theme.fn.smallerThan('sm')]: {
      height: '10rem',
    },
  },
  inner: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: [theme.white],
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '.5rem',
    },
  },
  link: {
    color: 'inherit !important',
    textDecoration: 'none',

    transition: 'color .2s',
    '&:hover': {
      color: [theme.colors[theme.primaryColor][2]],
    },
  },
}));

const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <MantineContainer className={classes.inner} size="lg">
        <div className={classes.group}>
          <span>&copy;{new Date().getFullYear()}</span>
          <a
            href="https://mmg.fjfi.cvut.cz/mmg/index.php"
            title="Mathematical Modelling group website"
            className={classes.link}
          >
            MMG, FNSPE CTU in Prague
          </a>
        </div>
      </MantineContainer>
    </div>
  );
};

export default Footer;
