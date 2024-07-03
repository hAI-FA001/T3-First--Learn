import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { SimpleUploadButton } from './simple-upload-button';
import Link from 'next/link';

export function TopNav() {
  return (
    <nav className="flex items-center justify-between w-full p-4 text-xl font-semibold border-b">
      <div>Gallery</div>
      <div className='flex flex-row items-center gap-4'>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          {/* will get type error if it's incorrect, it's taking this from uploadthing core.ts */}
          {/* <UploadButton endpoint="imageUploader" onClientUploadComplete={() => {
                    router.refresh();
                }} /> */}
          <Link href="/album/view" className="bg-blue-950 text-white hover:bg-blue-800 rounded-md p-3 me-5">View Albums</Link>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}
