import React, { forwardRef, useState } from 'react';
import { IconPhoto } from '@tabler/icons-react';
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
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { useRichTextEditorContext } from '@mantine/tiptap';

const useStyles = createStyles((theme) => {
  const colors = theme.fn.variant({ variant: 'light' });
  return {
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

      '&[data-active]': {
        backgroundColor: colors.background,
        color: colors.color,

        '&:hover': {
          ...theme.fn.hover({ backgroundColor: colors.hover }),
        },
      },
    },
    imageEditorInput: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRight: 0,
    },
    imageEditorSave: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  };
});

const marginMarks = [
  { value: 0, label: '0' },
  { value: 1, label: 'xs' },
  { value: 2, label: 'sm' },
  { value: 3, label: 'md' },
  { value: 4, label: 'lg' },
  { value: 5, label: 'xl' },
];

export const ImageControl = forwardRef<HTMLButtonElement>(() => {
  const { editor } = useRichTextEditorContext();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [src, setSrc] = useInputState('');
  const [opened, { open, close }] = useDisclosure(false);
  const [sliderWidth, setSliderWidth] = useState(100);
  const [sliderMargin, setSliderMargin] = useState(0);

  const handleOpen = () => {
    open();
    const image = editor?.getAttributes('image');
    if (!image) setSrc('');
    else {
      setSrc(image.src?.replace('/api/download/images/', '') || '');
      setSliderWidth(image.width?.replace('%', '') || 100);

      if (!image.style) setSliderMargin(0);
      else {
        const matches = /margin: (\d+)px/.exec(image.style);
        if (!matches) setSliderMargin(0);
        else {
          const margin = +matches[1];
          const marginIndex = marginMarks.findIndex(
            (mark) =>
              theme.spacing[mark.label as keyof typeof theme.spacing] ===
              margin,
          );
          setSliderMargin(marginIndex);
        }
      }
    }
  };

  const handleClose = () => {
    close();
    setSrc('');
    setSliderWidth(100);
    setSliderMargin(0);
  };

  const setImage = () => {
    handleClose();
    src === ''
      ? editor?.chain().focus().run()
      : editor
          ?.chain()
          .focus()
          .setImage({
            src: `/api/download/images/${src}`,
            width: `${sliderWidth}%`,
            style:
              sliderMargin === 0
                ? undefined
                : `margin: ${
                    theme.spacing[
                      marginMarks[sliderMargin]
                        .label as keyof typeof theme.spacing
                    ]
                  }px`,
          })
          .run();
  };

  const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setImage();
    }
  };

  return (
    <Popover
      trapFocus
      shadow="md"
      withinPortal
      opened={opened}
      onClose={handleClose}
      offset={-44}
      zIndex={10000}
    >
      <Popover.Target>
        <UnstyledButton
          className={classes.control}
          data-active={editor?.isActive('image') || undefined}
          data-rich-text-editor-control
        >
          <IconPhoto size={14} onClick={handleOpen} />
        </UnstyledButton>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack spacing="xs">
          <Flex direction="row">
            <TextInput
              placeholder="image.png"
              aria-label="Enter image url"
              type="url"
              value={src}
              onChange={setSrc}
              classNames={{ input: classes.imageEditorInput }}
              onKeyDown={handleInputKeydown}
            />

            <Button
              variant="default"
              onClick={setImage}
              className={classes.imageEditorSave}
            >
              Save
            </Button>
          </Flex>

          <Flex direction="row" gap="xs" align="center">
            <Text fz="xs">Width</Text>
            <Slider
              size="sm"
              value={sliderWidth}
              onChange={setSliderWidth}
              label={(value) => `${value}%`}
              marks={[
                { value: 20, label: '20%' },
                { value: 50, label: '50%' },
                { value: 80, label: '80%' },
              ]}
              mb="md"
              w="100%"
            />
          </Flex>

          <Flex direction="row" gap="xs" align="center">
            <Text fz="xs">Margin</Text>
            <Slider
              size="sm"
              value={sliderMargin}
              onChange={setSliderMargin}
              step={1}
              min={0}
              max={5}
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
});
