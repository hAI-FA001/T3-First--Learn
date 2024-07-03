"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ImageCard = ({ image, isSelected, onSelect }: {
    image: {
        id: number;
        name: string;
        url: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date | null;
    },
    isSelected: boolean,
    onSelect: (imageId: number, isSelected: boolean) => void
}) => {
    return (
        <div className="relative h-48 w-48 flex flex-col">
            <button
                className={"absolute w-5 h-5 -top-2 -right-3 rounded-xl border-2 border-blue-600 " + (isSelected? "bg-green-400" : "")}
                onClick={(_) => {
                    onSelect(image.id, isSelected);
                }}>
            </button>
          <Link href={`/img/${image.id}`}>
            <Image src={image.url} style={{ objectFit: "contain" }} width={192} height={192} alt={image.name} />
          </Link>
          <div>{image.name}</div>
        </div>
    );
}

const ImageSection = ({ images }: {
    images: {
        id: number;
        name: string;
        url: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date | null;
    }[]
}) => {
    const [selectedImages, setSelectedImages] = useState<number[]>([]);

    function handleSelectImage(imageId: number, isSelected: boolean) {
        let nextSelectedImages;
        
        if (isSelected) {
            nextSelectedImages = [...selectedImages];
            nextSelectedImages.splice(nextSelectedImages.findIndex((elem) => elem == imageId), 1)
        } else {
            nextSelectedImages = [...selectedImages, imageId];
        }
        
        setSelectedImages(nextSelectedImages);
    }

    return (
        <div className="flex flex-wrap justify-center gap-8 p-4">
            {images.map((image) => (
                <ImageCard key={image.id} onSelect={handleSelectImage} image={image} isSelected={selectedImages.findIndex((elem) => elem == image.id) != -1} />
            ))}
        </div>
    );
}

export default ImageSection; 