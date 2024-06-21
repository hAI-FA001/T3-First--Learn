import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/1233f194-b8fb-4fae-a601-f011ab3e9b11-1sj3pb.png",
  "https://utfs.io/f/ac72614b-dbb0-4843-819c-71138dd8cd4c-1lv0vz.png",
  "https://utfs.io/f/368abcb0-26f4-4165-bf5d-02823fff88b6-hcfblw.png",
  "https://utfs.io/f/db313d57-4e40-48cd-acfa-35d99b4c3204-ckolpg.png"
]

const mockImages = mockUrls.map((url, idx) => ({  // need to put {...} in ()
  id: idx + 1,
  url
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">{  // gap-4 to put space b/w images
        [...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))
    }</div>
    </main>
  );
}
