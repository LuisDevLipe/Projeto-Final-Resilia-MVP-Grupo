import React from 'react'

const ImgWithFallback = ({
    src,
    fallback,
    ...delegated
  }) => {
    return (
      <picture>
        <source srcSet={src} type="image/webp" />
        <img src={fallback} type="image/jpg" {...delegated}/>
      </picture>
    );
  };
  export default ImgWithFallback