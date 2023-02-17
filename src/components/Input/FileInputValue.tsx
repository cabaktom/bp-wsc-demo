import { Center, FileInputProps, Group, createStyles } from '@mantine/core';
import { IconFile, IconPhoto } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.gray[1],
    fontSize: theme.fontSizes.xs,
    padding: '.3rem .7rem',
    borderRadius: theme.radius.sm,
  },
  icon: {
    marginRight: '.5rem',
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '20rem',
    display: 'inline-block',
  },
}));

type FileInputValueProps = {
  file: File;
};

const FileInputValueInner = ({ file }: FileInputValueProps) => {
  const { classes } = useStyles();

  return (
    <Center className={classes.container} inline>
      {file.type.startsWith('image') ? (
        <IconPhoto className={classes.icon} size={14} />
      ) : (
        <IconFile className={classes.icon} size={14} />
      )}
      <span className={classes.text}>{file.name}</span>
    </Center>
  );
};

const FileInputValue: FileInputProps['valueComponent'] = ({ value }) => {
  if (Array.isArray(value)) {
    return (
      <Group spacing="sm" py="xs">
        {value.map((file, index) => (
          <FileInputValueInner file={file} key={index} />
        ))}
      </Group>
    );
  }

  return <FileInputValueInner file={value!} />;
};

export default FileInputValue;
