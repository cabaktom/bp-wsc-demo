import Image from '@tiptap/extension-image';

const TipTapImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(), // keep parent attributes (src, alt, title)

      // src is rendered as '/api/images/download/<src>'
      // and parsed as '<src>' (without '/api/images/download/')
      src: {
        default: null,
        renderHTML: (attributes) => ({
          src: `/api/images/download/${attributes.src}`,
        }),
        parseHTML: (element) =>
          element.getAttribute('src')?.replace('/api/images/download/', '') ||
          '',
      },

      // width is rendered as 'width: <width>%'
      // and parsed as '<width>' (without '%', as a number)
      width: {
        default: null,
        renderHTML: (attributes) => ({ width: `${attributes.width}%` }),
        parseHTML: (element) =>
          +(element.getAttribute('width')?.slice(0, -1) || 0),
      },

      decoding: { default: 'async' },

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
    };
  },
});

export default TipTapImage;
