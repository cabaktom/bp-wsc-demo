import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

import { ImageControl } from './ImageControl';
import MyTipTapImage from './MyTipTapImage';
import { IframeControl } from './IframeControl';
import MyTipTapIframe from './MyTipTapIframe';

type RTEProps = {
  content: string;
  setContent: (content: string) => void;
  placeholder?: string;
  hideToolbar?: boolean;
};

const RTE = ({
  content,
  setContent,
  placeholder = '',
  hideToolbar = false,
}: RTEProps) => {
  const [hidden, hiddenHandlers] = useDisclosure(hideToolbar);

  const matches = useMediaQuery('(min-width: 992px)', false, {
    getInitialValueInEffect: false,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      MyTipTapImage,
      MyTipTapIframe,
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  return (
    <>
      <RichTextEditor
        editor={editor}
        onFocus={() => {
          if (hideToolbar) hiddenHandlers.close();
        }}
        onBlur={() => {
          if (hideToolbar) hiddenHandlers.open();
        }}
      >
        <RichTextEditor.Toolbar
          sticky
          stickyOffset={matches ? 47 : 97}
          hidden={hideToolbar && hidden}
        >
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
            <RichTextEditor.H5 />
            <RichTextEditor.H6 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <ImageControl />
            <IframeControl />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </>
  );
};

export default RTE;
