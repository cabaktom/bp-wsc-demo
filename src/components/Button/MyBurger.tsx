import type { Dispatch, SetStateAction } from 'react';
import { Burger, type BurgerProps, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  burger: {
    marginLeft: 'auto',
    outline: 'none',
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

type MyBurgerProps = BurgerProps & {
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const MyBurger = ({ setOpened, ...rest }: MyBurgerProps) => {
  const { classes } = useStyles();

  return (
    <Burger
      className={classes.burger}
      onClick={() => setOpened((o) => !o)}
      size="md"
      mr="md"
      color="white"
      {...rest}
    />
  );
};

export default MyBurger;
