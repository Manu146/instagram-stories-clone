import React from "react";

const useProgressiveImg = (lowQualitySrc, highQualitySrc, callbackFn) => {
  const [src, setSrc] = React.useState(lowQualitySrc);

  React.useEffect(() => {
    console.log(highQualitySrc);
    setSrc(lowQualitySrc);

    const img = new Image();
    img.src = highQualitySrc;

    img.onload = () => {
      console.log("asd");
      callbackFn();
      setSrc(highQualitySrc);
    };
  }, [lowQualitySrc, highQualitySrc]);

  return [src, { blur: src === lowQualitySrc }];
};

export default useProgressiveImg;
