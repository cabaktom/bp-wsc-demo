import { Affix, Button, Transition, createStyles } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  affix: {
    bottom: '2rem !important',
    right: '2rem !important',

    [theme.fn.smallerThan('sm')]: {
      bottom: '2.5rem',
      right: '2.5rem',
    },
  },
  button: {
    padding: '0 1.25rem 0 .75rem',
    height: '4rem',

    [theme.fn.smallerThan('sm')]: {
      padding: '0 1rem',
    },
  },
  icon: {
    marginRight: '.5rem',
    color: 'white !important',

    [theme.fn.smallerThan('sm')]: {
      marginRight: '0',
    },
  },
  text: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

const ScrollToTop = () => {
  const { classes } = useStyles();
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix className={classes.affix}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {() => (
          <Button className={classes.button} onClick={() => scrollTo({ y: 0 })}>
            <IconArrowUp className={classes.icon} />
            <span className={classes.text}>Scroll to top</span>
          </Button>
        )}
      </Transition>
    </Affix>
  );
};

export default ScrollToTop;
