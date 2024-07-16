import { IImage } from "@/typings";
import React from "react";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  image: IImage;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, onClick, index, image } = props;
  console.log(selected);
  console.log(index);

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="relative w-[80px] h-[80px] overflow-hidden"
      >
        <img
          src={image.secure_url}
          alt="image"
          className="w-[80px] h-[80px] object-contain"
        />
        {!selected && (
          <span className="absolute inset-0 w-full h-full bg-black/60" />
        )}
      </button>
    </div>
  );
};
