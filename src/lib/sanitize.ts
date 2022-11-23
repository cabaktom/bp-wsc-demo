import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

export default function sanitize(htmlStr: string) {
  const { window } = new JSDOM('');
  // @ts-expect-error
  const domPurify = DOMPurify(window);
  domPurify.setConfig({
    USE_PROFILES: { html: true },
  });

  return domPurify.sanitize(htmlStr);
}
