import Link from "next/link";
import { redirect } from "next/navigation";
import { addImagesToAlbum, getAlbums } from "~/server/queries";
import BackButton from "../view/back-button";

export default async function AlbumPage({
  searchParams,
}: {
  searchParams: { selectedImages: string };
}) {
  let selectedImages = JSON.parse(searchParams.selectedImages) as number[];
  const loadedAlbums = await getAlbums();

  // selectedImages can be a single number, so fix that
  if (typeof selectedImages === typeof 1) {
    const idArray = [selectedImages as unknown as number];
    selectedImages = idArray;
  }

  return (
    <div className="relative pt-5">
      <BackButton />

      <Link
        href="/album/add/"
        className="mx-auto flex h-12 w-48 items-center justify-center rounded-xl border-2 border-blue-500 hover:bg-blue-950"
      >
        New Album
      </Link>

      <div className="mt-20 flex flex-wrap gap-4">
        {loadedAlbums.map((album) => (
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
        ))}
      </div>
    </div>
  );
}
