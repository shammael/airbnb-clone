"use client";

import Image from "next/image";

interface Props {
  imageUrl?: string | undefined | null;
}

const Avatar = ({ imageUrl }: Props) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="avatar"
      src={imageUrl ? imageUrl : "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
