import { redirect } from "next/navigation";
import { addImagesToAlbum } from "~/server/queries";
import AlbumSection from "~/app/_components/album-section";

export default async function AlbumPage({
  searchParams,
}: {
  searchParams: { selectedImages: string };
}) {
  let selectedImages = JSON.parse(searchParams.selectedImages) as number[];

  // selectedImages can be a single number, so fix that
  if (typeof selectedImages === typeof 1) {
    const idArray = [selectedImages as unknown as number];
    selectedImages = idArray;
  }

  return (
    <AlbumSection
      createAlbumComponent={(album) => (
        <form
          key={album.id}
          action={async () => {
            "use server";

            await addImagesToAlbum(selectedImages, album.id);
            redirect("/");
          }}
        >
          <button
            type="submit"
            className="h-48 w-48 border-2 border-blue-500 text-center  hover:bg-blue-950"
          >
            {album.name}
          </button>
        </form>
      )}
    />
  );
}
