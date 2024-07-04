import Link from "next/link";
import AlbumSection from "~/app/_components/album-section";

export default async function AlbumPage() {
  return (
    <AlbumSection
      createAlbumComponent={(album) => (
        <Link
          key={album.id}
          href={`/album/view/${album.id}`}
          className="flex h-48 w-48 items-center justify-center border-2 border-blue-500 text-center hover:bg-blue-950"
        >
          {album.name}
        </Link>
      )}
    />
  );
}
