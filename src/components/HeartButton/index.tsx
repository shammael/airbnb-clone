"use client";

import HeartIcon from "@/icons/Heart";
import HeartFilledIcon from "@/icons/HeartFilled.icon";

interface Props {
  id: string;
  userId?: string;
}

const HeartButton = ({ id, userId }: Props) => {
  const hasFavorited = true;
  const toggleFavorite = () => {};

  return (
    <div
      className="relative hover:opacity-80 transition cursoir-pointer"
      onClick={toggleFavorite}
    >
      <HeartIcon className="fill-white absolute" />
      <HeartFilledIcon
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
