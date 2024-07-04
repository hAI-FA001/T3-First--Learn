"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ViewAlbumButton = () => {
  const pathname = usePathname();

  return (
    !pathname.includes("album") && (
      <Link
        href="/album/view"
        className="me-5 rounded-md bg-blue-950 p-3 text-white hover:bg-blue-800"
      >
        View Albums
      </Link>
    )
  );
};

export default ViewAlbumButton;
