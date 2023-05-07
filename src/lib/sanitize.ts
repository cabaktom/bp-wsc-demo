import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML string to prevent XSS attacks.
 *
 * @param htmlStr The plain HTML string to sanitize.
 * @returns The sanitized HTML string.
 */
export default function sanitize(htmlStr: string) {
  const { window } = new JSDOM('');
  // @ts-expect-error
  const domPurify = DOMPurify(window);
  domPurify.setConfig({
    USE_PROFILES: { html: true },
    ADD_TAGS: ['iframe'],
  });

  return domPurify.sanitize(htmlStr);
}
