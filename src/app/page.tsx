import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getImageCount, getImages as getMyImages } from "~/server/queries";
import ImageContainer from "./_components/image-section";

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
  const loadImages = async (skip: number, limit: number) => {
    "use server";

    return getMyImages(skip, limit);
  };

  const imageCount = await getImageCount();

  const initialImages = await loadImages(0, 10);

  return (
    <ImageContainer
      initialImages={initialImages}
      loadImages={loadImages}
      imageCount={imageCount}
      selectedImagesInfo={{ path: "/album/selected", text: "Add to Album" }}
    />
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
