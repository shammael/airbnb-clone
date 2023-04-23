"use client";
import PhotoAddIcon from "@/icons/PhotoAdd.icon";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({ onChange, value }: Props) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="leuok1o7"
        options={{ maxFiles: 1 }}
      >
        {({ open }) => {
          return (
            <div
              className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
              onClick={() => open?.()}
            >
              <PhotoAddIcon className="h-10 w-10" />
              <div className="font-semiold text-lg">Click to upload</div>
              {value && (
                <div className=" absolute inset-0 w-full h-full">
                  <Image
                    alt="upload"
                    fill
                    style={{ objectFit: "cover" }}
                    src={value}
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
