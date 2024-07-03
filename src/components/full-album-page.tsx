import ImageContainer from "~/app/_components/image-section";
import { getAlbumImageCount, getAlbumImages } from "~/server/queries";

export default async function FullPageAlbumView(props: { id: number }) {
  const imageCount = await getAlbumImageCount(props.id);
  const images = await getAlbumImages(props.id, 0, 10);

  const loadImages = async (skip: number, limit: number) => {
    "use server";

    return getAlbumImages(props.id, skip, limit);
  };

  return (
    <div className="grid h-full w-full grid-rows-[auto,1fr]">
      {imageCount == 0 ? (
        <span className="mt-10 text-center">No Images Added</span>
      ) : (
        <ImageContainer
          initialImages={images}
          loadImages={loadImages}
          imageCount={imageCount}
          selectedImagesInfo={{
            path: "/album/remove",
            text: "Remove from Album",
            extraSearchParams: "" + props.id,
          }}
        />
      )}
    </div>
  );
}
