import { Modal } from "~/app/@modal/(.)img/[id]/modal";
import FullPageAlbumView from "~/components/full-album-page";

export const dynamic = "force-dynamic";

export default function PhotoModal({
  params: { id: albumId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(albumId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid album id");

  return (
    <Modal>
      <FullPageAlbumView id={idAsNumber} />
    </Modal>
  );
}
