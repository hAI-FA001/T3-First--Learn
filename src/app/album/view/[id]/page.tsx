import FullPageAlbumView from "~/components/full-album-page";

export default function Page({
  params: { id: albumId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(albumId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid album id");

  return <FullPageAlbumView id={idAsNumber} />;
}
