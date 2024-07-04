import Link from "next/link";
import BackButton from "./back-button";
import { getAlbums } from "~/server/queries";

type album = {
  id: number;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
};

const AlbumSection = async ({
  createAlbumComponent,
}: {
  createAlbumComponent: (loadedAlbums: album) => React.ReactNode;
}) => {
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
        {loadedAlbums.map(createAlbumComponent)}
      </div>
    </div>
  );
};

export default AlbumSection;
