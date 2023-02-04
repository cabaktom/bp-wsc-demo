import Link from 'next/link';
import { Container, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'sticky',
    top: '100vh',
    height: '12rem',
    marginTop: '4rem',
    backgroundColor: [theme.colors[theme.primaryColor][9]],
    [theme.fn.smallerThan('sm')]: {
      height: '10rem',
    },
  },
  inner: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    color: [theme.white],
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '1rem',

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
      <Container className={classes.inner} size="lg">
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

        <Link href="/admin">Administrator</Link>
      </Container>
    </div>
  );
};

export default Footer;
