import Image from 'next/image';
import type { Image as ImageType } from '@prisma/client';
import { PhotoAlbum } from 'react-photo-album';

type MyPhotoAlbumProps = {
  images: ImageType[];
};

const MyPhotoAlbum = ({ images }: MyPhotoAlbumProps) => {
  const photos = images.map((image, index) => {
    return {
      src: image.path,
      width: 500,
      height: 500,
      alt: image.alt || 'Image',
      index,
    };
  });

  return (
    <PhotoAlbum
      layout="rows"
      photos={photos}
      targetRowHeight={(containerWidth) => {
        if (containerWidth < 450) return containerWidth;
        if (containerWidth < 700) return containerWidth / 2;
        if (containerWidth < 1000) return containerWidth / 3;
        if (containerWidth < 1200) return containerWidth / 4;
        return containerWidth / 5;
      }}
      renderPhoto={({
        imageProps: { src, alt, title, className, onClick },
        wrapperStyle,
        photo: { index },
      }) => (
        <div style={wrapperStyle}>
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
    />
  );
};

export default MyPhotoAlbum;
