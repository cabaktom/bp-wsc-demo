import type { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import {
  Affix as MantineAffix,
  Container as MantineContainer,
  Group as MantineGroup,
  Text as MantineText,
  createStyles,
} from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons';

import Button from '../Button/Button';

const useStyles = createStyles((theme) => ({
  bar: {
    width: '100vw',
    backgroundColor: [theme.colors[theme.primaryColor][7]],
  },
  container: {
    margin: '1rem 0',
  },
}));

type AdminAffixProps = {
  setOpened: (opened: boolean) => void;
};

const AdminAffix = ({ setOpened }: AdminAffixProps) => {
  const { classes } = useStyles();
  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  return (
    <>
      <MantineAffix className={classes.bar}>
        <MantineContainer className={classes.container} size="lg">
          <MantineGroup position="apart">
            <MantineGroup spacing="lg">
              <MantineText c="white" fw="bold">
                Logged in ({user?.username})
              </MantineText>
              <Button
                color="red"
                variant="filled"
                onClick={() => setOpened(true)}
              >
                Log out
              </Button>
            </MantineGroup>

            <Button color="green" variant="filled">
              <IconDeviceFloppy />
            </Button>
          </MantineGroup>
        </MantineContainer>
      </MantineAffix>
    </>
  );
};

export default AdminAffix;
