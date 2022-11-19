import React, { Dispatch, SetStateAction } from 'react';
import { Burger as MantineBurger, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  burger: {
    marginLeft: 'auto',
    outline: 'none',
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

type BurgerProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const Burger = ({ opened, setOpened }: BurgerProps) => {
  const { classes } = useStyles();

  return (
    <MantineBurger
      className={classes.burger}
      opened={opened}
      onClick={() => setOpened((o) => !o)}
      size="md"
      mr="md"
      color="white"
    />
  );
};

export default Burger;
