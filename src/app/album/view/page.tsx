import Link from "next/link";
import { getAlbums } from "~/server/queries";
import BackButton from "./back-button";

export default async function AlbumPage() {
  const loadedAlbums = await getAlbums();

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
          <Link
            key={album.id}
            href={`/album/view/${album.id}`}
            className="flex h-48 w-48 items-center justify-center border-2 border-blue-500 text-center hover:bg-blue-950"
          >
            {album.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
