import { Node } from '@tiptap/core';

export interface IframeOptions {
  allowFullscreen: boolean;
  HTMLAttributes: {
    [key: string]: any;
  };
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    iframe: {
      /**
       * Add an iframe
       */
      setIframe: (options: {
        src: string;
        width?: number;
        margin?: number;
      }) => ReturnType;
    };
  }
}

export default Node.create<IframeOptions>({
  name: 'iframe',

  group: 'block',

  atom: true,

  addOptions() {
    return {
      allowFullscreen: true,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },

      // width is rendered as 'width: <width>%'
      // and parsed as '<width>' (without '%', as a number)
      width: {
        default: null,
        renderHTML: (attributes) => ({ width: `${attributes.width}%` }),
        parseHTML: (element) =>
          +(element.getAttribute('width')?.slice(0, -1) || 0),
      },

      height: {
        default: 350,
      },

      // margin is rendered as 'data-margin: <margin>' and 'style: margin: <margin>px'
      // and parsed as '<margin>' (without 'px', as a number)
      margin: {
        default: null,
        renderHTML: (attributes) => ({
          'data-margin': attributes.margin,
          style: `margin: ${attributes.margin}px`,
        }),
        parseHTML: (element) => element.getAttribute('data-margin'),
      },

      // frameborder is rendered as 'data-frameborder: <frameborder>' and 'style: border: <frameborder>'
      // and parsed as '<frameborder>' (as a number)
      frameborder: {
        default: '0',
        renderHTML: (attributes) => ({
          'data-frameborder': attributes.frameborder,
          style: `border: ${attributes.frameborder}`,
        }),
        parseHTML: (element) => element.getAttribute('data-frameborder'),
      },

      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', this.options.HTMLAttributes, ['iframe', HTMLAttributes]];
  },

  addCommands() {
    return {
      setIframe:
        (options: { src: string }) =>
        ({ tr, dispatch }) => {
          const { selection } = tr;
          const node = this.type.create(options);

          if (dispatch) {
            tr.replaceRangeWith(selection.from, selection.to, node);
          }

          return true;
        },
    };
  },
});
