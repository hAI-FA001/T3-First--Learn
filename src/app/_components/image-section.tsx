"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "./loading-spinner";

type image = {
  id: number;
  name: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
};

const ImageCard = ({
  image,
  isSelected,
  onSelect,
  modalPath,
}: {
  image: image;
  isSelected: boolean;
  onSelect: (imageId: number, isSelected: boolean) => void;
  modalPath: string;
}) => {
  return (
    <div className="relative flex h-48 w-48 flex-col">
      <button
        className={
          "absolute -right-3 -top-2 h-5 w-5 rounded-xl border-2 border-blue-900 hover:border-blue-600 " +
          (isSelected ? "bg-blue-400" : "")
        }
        onClick={(_) => {
          onSelect(image.id, isSelected);
        }}
      ></button>
      <Link href={`${modalPath}/${image.id}`}>
        <Image
          src={image.url}
          style={{ objectFit: "contain" }}
          width={192}
          height={192}
          alt={image.name}
        />
      </Link>
      <div>{image.name}</div>
    </div>
  );
};

export const ImageSection = ({
  images,
  selectedImagesInfo,
}: {
  images: image[];
  selectedImagesInfo: {
    path: string;
    text: string;
    modalPath: string;
    extraSearchParams?: string;
  };
}) => {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  function handleSelectImage(imageId: number, isSelected: boolean) {
    let nextSelectedImages;

    if (isSelected) {
      nextSelectedImages = [...selectedImages];
      nextSelectedImages.splice(
        nextSelectedImages.findIndex((elem) => elem == imageId),
        1,
      );
    } else {
      nextSelectedImages = [...selectedImages, imageId];
    }

    setSelectedImages(nextSelectedImages);
  }

  return (
    <div>
      {selectedImages.length > 0 && (
        <Link
          href={{
            pathname: selectedImagesInfo.path,
            query: {
              selectedImages: JSON.stringify(selectedImages),
              extraSearchParams: selectedImagesInfo.extraSearchParams,
            },
          }}
          className="fixed bottom-5 right-10 z-10 w-fit rounded-md bg-cyan-800 px-5 py-2 text-lg text-white hover:bg-cyan-600"
        >
          {selectedImagesInfo.text}
          <span className="absolute -top-3 right-0 min-h-5 min-w-5 rounded-full border-2 border-emerald-200 text-center text-sm font-bold text-emerald-200">
            {selectedImages.length}
          </span>
        </Link>
      )}
      <div className="flex flex-wrap justify-center gap-8 p-4">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            onSelect={handleSelectImage}
            image={image}
            modalPath={selectedImagesInfo.modalPath}
            isSelected={
              selectedImages.findIndex((elem) => elem == image.id) != -1
            }
          />
        ))}
      </div>
    </div>
  );
};

const ImageContainer = ({
  initialImages,
  loadImages,
  imageCount,
  selectedImagesInfo,
}: {
  initialImages: image[];
  loadImages: (skip: number, limit: number) => Promise<image[]>;
  imageCount: number;
  selectedImagesInfo: {
    path: string;
    text: string;
    modalPath: string;
    extraSearchParams?: string;
  };
}) => {
  const [skip, setSkip] = useState<number>(10);
  const [images, setImages] = useState<image[]>(initialImages);
  const [ref, inView] = useInView();

  async function loadMoreImages() {
    const nextImages = await loadImages(skip, 10);

    setImages([...images, ...nextImages]);
    setSkip(skip + 10);
  }

  useEffect(() => {
    if (inView) {
      void loadMoreImages();
    }
  }, [inView]);

  return (
    <div>
      <ImageSection images={images} selectedImagesInfo={selectedImagesInfo} />
      {imageCount - images.length > 0 && (
        <div className="mt-10 flex items-center justify-center gap-2" ref={ref}>
          {" "}
          <LoadingSpinner /> Loading...
        </div>
      )}
    </div>
  );
};

export default ImageContainer;
