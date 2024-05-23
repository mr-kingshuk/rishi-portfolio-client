import React, { useState, useEffect, useRef } from 'react';
import { Blurhash } from 'react-blurhash';
import styles from './MediaComponent.module.css';

const ImgComponent = ({ src, hash }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    // Load the image only if the src is defined
    if (src) {
      const img = imageRef.current; // Access the image element
      // Attach onLoad directly to the image element
      img.onload = () => {
        setImageLoaded(true);
      };
      img.src = src;
    }
  }, [src]);

  return (
    <>
      <div style={{ display : imageLoaded ? 'none' : 'inline'}}>
        <Blurhash
          hash={hash}
          width={"100%"}
          height={"100%"}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      <img ref={imageRef} className={styles.image} style={{ display : !imageLoaded ? 'none' : 'inline'}} src={src} alt="Image of media" />
    </>
  );
};

export default ImgComponent;