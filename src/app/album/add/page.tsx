import { addAlbum } from "~/server/queries";
import AlbumInput from "./album-input";
import { redirect } from "next/navigation";

const AddAlbum = async ({ searchParams }: { searchParams: { q?: string } }) => {
  const albumName = searchParams.q ?? "";

  if (albumName) {
    await addAlbum(albumName);
    redirect("/album/view");
  }

  return <AlbumInput />;
};

export default AddAlbum;
