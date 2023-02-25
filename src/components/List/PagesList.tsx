import { Accordion, Button, Group, Stack, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useListState } from '@mantine/hooks';
import type { Page } from '@prisma/client';
import { IconCheck, IconDeviceFloppy, IconX } from '@tabler/icons-react';

import RTE from '../Editor/RTE';

type PagesListProps = {
  pages: Page[];
};

const PagesList = ({ pages: initPages }: PagesListProps) => {
  const [pages, pagesHandlers] = useListState(
    initPages.map((page) => {
      return { ...page, loading: false };
    }),
  );

  const handleSave = async (page: Page, index: number) => {
    pagesHandlers.setItemProp(index, 'loading', true);

    const res = await fetch(`/api/pages/${page.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...page }),
    });

    pagesHandlers.setItemProp(index, 'loading', false);

    if (!res.ok) {
      const data = await res.json();
      showNotification({
        title: 'Error!',
        message: `Changes to page ${page.title} could not be saved. ${data.message}`,
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 4000,
      });
    } else {
      showNotification({
        title: 'Success!',
        message: `Changes to page ${page.title} saved.`,
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });
    }
  };

  const handleChange = (
    index: number,
    fieldName: keyof Page,
    content: string,
  ) => {
    pagesHandlers.setItemProp(index, fieldName, content);
  };

  return (
    <Accordion variant="contained" multiple chevronPosition="left">
      {pages.map((page, index) => (
        <Accordion.Item key={index} value={page.id.toString()}>
          <Accordion.Control h="6rem" title={`Edit ${page.title} page`}>
            {page.title}
          </Accordion.Control>
          <Accordion.Panel>
            <Stack spacing="md">
              <Group position="apart" align="end" spacing="md" noWrap>
                <TextInput
                  label="Page title"
                  aria-label="Page title input"
                  value={page.title}
                  onChange={(event) =>
                    handleChange(index, 'title', event.currentTarget.value)
                  }
                  w={{ base: '100%' }}
                />
                <Button
                  leftIcon={<IconDeviceFloppy size={18} />}
                  onClick={() => handleSave(page, index)}
                  loading={page.loading}
                >
                  Save
                </Button>
              </Group>

              <RTE
                content={page.content}
                setContent={handleChange.bind(null, index, 'content')}
              />
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default PagesList;
