import React, { forwardRef, useState } from 'react';
import {
  Popover,
  TextInput,
  Button,
  createStyles,
  UnstyledButton,
  Flex,
  Slider,
  Text,
  Stack,
} from '@mantine/core';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { useRichTextEditorContext } from '@mantine/tiptap';
import { Editor } from '@tiptap/react';

const useStyles = createStyles((theme) => ({
  control: {
    backgroundColor: theme.white,
    minWidth: '2.6rem',
    height: '2.6rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `thin solid ${theme.colors.gray[4]}`,
    borderRadius: theme.fn.radius(),
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },

    '&[data-active]': {
      backgroundColor: theme.colors.blue[0],
      color: theme.colors.blue[9],

      '&:hover': {
        backgroundColor: theme.fn.darken(theme.colors.blue[0], 0.035),
      },
    },
  },
  editorInput: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
    width: '22rem',
  },
  editorSave: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

type ControlProps = {
  icon: React.ReactNode;
  nodeType: string;
  inputPlaceholder: string;
  inputLabel: string;
  widthMin: number;
  widthMax: number;
  widthMarks: { value: number; label: string }[];
  marginMin: number;
  marginMax: number;
  marginMarks: { value: number; label: string; actualValue: number }[];
  setNode: ({
    editor,
    src,
    width,
    margin,
  }: {
    editor?: Editor;
    src: string;
    width: number;
    margin: number;
  }) => void;
};

export const Control = forwardRef<HTMLButtonElement, ControlProps>(
  (
    {
      icon,
      nodeType,
      inputPlaceholder,
      inputLabel,
      widthMin,
      widthMax,
      widthMarks,
      marginMin,
      marginMax,
      marginMarks,
      setNode,
    },
    ref,
  ) => {
    const { editor } = useRichTextEditorContext();
    const { classes } = useStyles();

    const [src, setSrc] = useInputState('');
    const [opened, { toggle, close }] = useDisclosure(false);
    const [width, setWidth] = useState(100);
    const [margin, setMargin] = useState(0);

    const handleOpen = () => {
      toggle();
      const node = editor?.getAttributes(nodeType);
      setSrc(node.src || '');
      setWidth(node.width || 100);
      setMargin(
        marginMarks.find((mark) => mark.actualValue === node.margin)?.value ||
          0,
      );
    };

    const handleClose = () => {
      close();
      setSrc('');
      setWidth(100);
      setMargin(0);
    };

    const _setNode = () => {
      handleClose();
      src === ''
        ? editor?.chain().focus().run()
        : setNode({
            editor,
            src,
            width,
            margin: marginMarks[margin].actualValue,
          });
    };

    const handleInputKeydown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        _setNode();
      }
    };

    return (
      <Popover
        trapFocus
        shadow="md"
        withinPortal
        opened={opened}
        onClose={handleClose}
        zIndex={10000}
      >
        <Popover.Target>
          <UnstyledButton
            className={classes.control}
            data-active={editor?.isActive(nodeType) || undefined}
            data-rich-text-editor-control
            onClick={handleOpen}
            ref={ref}
          >
            {icon}
          </UnstyledButton>
        </Popover.Target>

        <Popover.Dropdown>
          <Stack spacing="xs">
            <Flex direction="row">
              <TextInput
                placeholder={inputPlaceholder}
                aria-label={inputLabel}
                type="url"
                value={src}
                onChange={setSrc}
                classNames={{ input: classes.editorInput }}
                onKeyDown={handleInputKeydown}
              />

              <Button
                variant="default"
                onClick={_setNode}
                className={classes.editorSave}
              >
                Save
              </Button>
            </Flex>

            <Flex direction="row" gap="xs" align="center">
              <Text fz="xs" w="20%">
                Width
              </Text>
              <Slider
                size="sm"
                value={width}
                onChange={setWidth}
                label={(value) => `${value}%`}
                min={widthMin}
                max={widthMax}
                marks={widthMarks}
                mb="md"
                w="100%"
              />
            </Flex>

            <Flex direction="row" gap="xs" align="center">
              <Text fz="xs" w="20%">
                Margin
              </Text>
              <Slider
                size="sm"
                value={margin}
                onChange={setMargin}
                min={marginMin}
                max={marginMax}
                marks={marginMarks}
                styles={{ label: { display: 'none' } }}
                mb="md"
                w="100%"
              />
            </Flex>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    );
  },
);
