import Image from 'next/image';
import Lightbox, { type SlideImage } from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Download from 'yet-another-react-lightbox/plugins/download';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';

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
        slide: ({ slide, rect }) => {
          const width = Math.round(
            Math.min(rect.width, (rect.height / slide.height!) * slide.width!),
          );
          const height = Math.round(
            Math.min(rect.height, (rect.width / slide.width!) * slide.height!),
          );

          return (
            <div style={{ position: 'relative', width, height }}>
              <Image
                fill
                alt={slide.alt!}
                src={slide.src}
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
      plugins={[Captions, Zoom, Fullscreen, Download, Counter]}
      animation={{ swipe: 250 }}
      on={{
        view: ({ index }) => setIndex(index),
      }}
    />
  );
};

export default MyLightbox;
