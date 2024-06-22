import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import { getImages as getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

// not using these now, cuz added to DB
// const mockUrls = [
//   "https://utfs.io/f/1233f194-b8fb-4fae-a601-f011ab3e9b11-1sj3pb.png",
//   "https://utfs.io/f/ac72614b-dbb0-4843-819c-71138dd8cd4c-1lv0vz.png",
//   "https://utfs.io/f/368abcb0-26f4-4165-bf5d-02823fff88b6-hcfblw.png",
//   "https://utfs.io/f/db313d57-4e40-48cd-acfa-35d99b4c3204-ckolpg.png"
// ]

// const mockImages = mockUrls.map((url, idx) => ({  // need to put {...} in ()
//   id: idx + 1,
//   url
// }));

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="h-48 w-48 flex flex-col">
          <Link href={`/img/${image.id}`}>
            <Image src={image.url} style={{ objectFit: "contain" }} width={192} height={192} alt={image.name} />
          </Link>
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  )
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
