import { redirect } from "next/navigation";
import { removeImagesFromAlbum } from "~/server/queries";

export default async function RemoveAlbumPage({
  searchParams,
}: {
  searchParams: { selectedImages: number[]; extraSearchParams: string };
}) {
  const selectedImages = JSON.parse(
    searchParams.selectedImages as unknown as string,
  ) as number[];

  const albumId = parseInt(searchParams.extraSearchParams);

  await removeImagesFromAlbum(selectedImages, albumId);

  redirect(`/album/view/${albumId}`);
}
