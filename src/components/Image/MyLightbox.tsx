import Image from 'next/image';
import Lightbox, { type SlideImage } from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import { IconDownload } from '@tabler/icons-react';

type MyLightboxProps = {
  images: SlideImage[];
  open: boolean;
  index: number;
  setIndex: (index: number) => void;
};

const MyLightbox = ({ images, open, index, setIndex }: MyLightboxProps) => {
  return (
    <Lightbox
      open={open}
      slides={images}
      render={{
        slide: (image, offset, rect) => {
          const width = Math.round(
            Math.min(rect.width, (rect.height / image.height!) * image.width!),
          );
          const height = Math.round(
            Math.min(rect.height, (rect.width / image.width!) * image.height!),
          );

          return (
            <div style={{ position: 'relative', width, height }}>
              <Image
                fill
                alt={image.alt!}
                src={`/api/download${image.src}?type=image/${image.src
                  .split('.')
                  .pop()}`}
                loading="eager"
                draggable={false}
                sizes={
                  typeof window !== 'undefined'
                    ? `${Math.ceil((width / window.innerWidth) * 100)}vw`
                    : `${width}px`
                }
              />
            </div>
          );
        },
      }}
      index={index}
      close={() => setIndex(-1)}
      plugins={[Captions, Zoom, Fullscreen]}
      animation={{ swipe: 250 }}
      on={{
        view: (index) => setIndex(index),
      }}
      toolbar={{
        buttons: [
          <a
            key="download"
            className="yarl__button"
            href={`/api/download${images[index]?.src}?type=image/jpg&download=true`}
            target="_blank"
            rel="noopener noreferrer"
            title="Download original image"
            aria-label="Download original image"
          >
            <IconDownload className="yarl__icon" />
          </a>,
          'close',
        ],
      }}
    />
  );
};

export default MyLightbox;
