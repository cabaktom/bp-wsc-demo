import { useViewportSize } from '@mantine/hooks';
import Image from 'next/image';
import { PhotoAlbum, type Photo } from 'react-photo-album';

type MyPhotoAlbumProps = {
  images: (Photo & { index: number })[];
  setIndex: (index: number) => void;
  setInteractive: (interactive: boolean) => void;
};

const MyPhotoAlbum = ({
  images,
  setIndex,
  setInteractive,
}: MyPhotoAlbumProps) => {
  const { width } = useViewportSize();

  return (
    <PhotoAlbum
      layout="rows"
      photos={images}
      targetRowHeight={width < 480 ? 200 : width < 900 ? 250 : 300}
      renderPhoto={({
        imageProps: { src, alt, title, className, onClick },
        wrapperStyle,
        photo: { index },
      }) => (
        <div
          style={{
            maxHeight: '60rem',
            aspectRatio: 'inherit',
            ...wrapperStyle,
          }}
        >
          <div
            style={{
              display: 'block',
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              style={{
                objectFit: 'cover',
              }}
              fill
              src={src}
              alt={alt}
              title={title}
              sizes={`100vw,
                      (max-width: 450px) 50vw,
                      (max-width: 700px) 33.3vw,
                      (max-width: 1000px) 25vw`}
              className={className}
              onClick={onClick}
              priority={index < 20}
            />
          </div>
        </div>
      )}
      onClick={({ index }) => {
        setIndex(index);
        setInteractive(true);
      }}
    />
  );
};

export default MyPhotoAlbum;
