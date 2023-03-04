import React, { forwardRef } from 'react';
import { IconPhoto } from '@tabler/icons-react';
import { useMantineTheme } from '@mantine/core';
import { Control } from './Control';

export const ImageControl = forwardRef<HTMLButtonElement>((props, ref) => {
  const theme = useMantineTheme();

  return (
    <Control
      icon={<IconPhoto size={14} />}
      nodeType="image"
      inputPlaceholder="image.png"
      inputLabel="Enter image url"
      widthMin={0}
      widthMax={100}
      widthMarks={[
        { value: 20, label: '20%' },
        { value: 50, label: '50%' },
        { value: 80, label: '80%' },
      ]}
      marginMin={0}
      marginMax={5}
      marginMarks={[
        { value: 0, label: '0', actualValue: 0 },
        { value: 1, label: 'xs', actualValue: theme.spacing.xs },
        { value: 2, label: 'sm', actualValue: theme.spacing.sm },
        { value: 3, label: 'md', actualValue: theme.spacing.md },
        { value: 4, label: 'lg', actualValue: theme.spacing.lg },
        { value: 5, label: 'xl', actualValue: theme.spacing.xl },
      ]}
      setNode={({ editor, src, width, margin }) => {
        return editor?.chain().focus().setImage({ src, width, margin }).run();
      }}
      ref={ref}
    />
  );
});
