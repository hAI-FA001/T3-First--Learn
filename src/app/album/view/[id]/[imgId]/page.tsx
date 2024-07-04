import FullPageImageView from "~/components/full-image-page";

export default function PhotoPage({
  params: { id: _, imgId: photoId },
}: {
  params: { id: string; imgId: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  return <FullPageImageView id={idAsNumber} />;
}
