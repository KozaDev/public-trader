import Image from "next/image";
import React from "react";

const Icon = ({ iconName, width, height }) => {
  return (
    <Image
      src={`/icons/${iconName}.png`}
      alt="Picture of the author"
      layout="fixed"
      width={width}
      height={height}
    />
  );
};

export default React.memo(Icon);
