import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";
import ViewAlbumButton from "./view-album-button";
import Link from "next/link";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <ViewAlbumButton />
          {/* will get type error if it's incorrect, it's taking this from uploadthing core.ts */}
          {/* <UploadButton endpoint="imageUploader" onClientUploadComplete={() => {
                    router.refresh();
                }} /> */}
          <Link
            href="/album/view"
            className="me-5 rounded-md bg-blue-950 p-3 text-white hover:bg-blue-800"
          >
            View Albums
          </Link>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
