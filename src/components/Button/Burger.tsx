import React, { Dispatch, SetStateAction } from 'react';
import {
  Burger as MantineBurger,
  BurgerProps as MantineBurgerProps,
  createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  burger: {
    marginLeft: 'auto',
    outline: 'none',
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

type BurgerProps = MantineBurgerProps & {
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const Burger = ({ setOpened, ...rest }: BurgerProps) => {
  const { classes } = useStyles();

  return (
    <MantineBurger
      className={classes.burger}
      onClick={() => setOpened((o) => !o)}
      size="md"
      mr="md"
      color="white"
      {...rest}
    />
  );
};

export default Burger;
