"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "~/components/ui/button";



export default function AlbumInput() {
    const [albumName, setAlbumName] = useState<string>("");
    
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();
    
    const handleAddAlbum = () => {
        const updatedSearchParams = new URLSearchParams(searchParams);

        if (albumName) {
            updatedSearchParams.set("q", albumName)
        } else {
            updatedSearchParams.delete("q");
        }

        startTransition(() => {
            router.replace(`${pathname}?${updatedSearchParams.toString()}`)
        })
    }

    return (
        <div className="flex flex-col justify-between items-center py-52 w-full h-full">
            <div className="flex flex-col justify-center items-center w-1/2">
                <label htmlFor="add-album" className="text-5xl mb-3">Album Name</label>
                <input
                    id="add-album"
                    value={albumName} type="text" onChange={(e) => {
                        setAlbumName(e.target.value);
                    }}
                    className="rounded-md p-3 w-full bg-transparent border-b-4 text-white mb-5"
                />
            </div>
            <Button type="submit" variant={"secondary"} className="w-1/2 text-lg" onClick={(_) => handleAddAlbum()}>
                Create
            </Button>
        </div>
    );
}