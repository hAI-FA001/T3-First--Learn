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

const ImageCard = ({ image, isSelected, onSelect }: {
    image: image,
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
    images: image[],
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

const ImageContainer = ({ initialImages, loadImages, imageCount }: {
    initialImages: image[],
    loadImages: (skip: number, limit: number) => Promise<image[]>,
    imageCount: number,
}) => {
    const [skip, setSkip] = useState<number>(0);
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
            <ImageSection images={images} />
            { imageCount - images.length > 0 && <div className="flex gap-2 justify-center items-center mt-10" ref={ref}> <LoadingSpinner /> Loading...</div>}
        </div>
    );
}

export default ImageContainer; 