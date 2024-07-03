import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "./ui/button";


export default async function FullPageImageView(props: { id: number }) {
    const image = await getImage(props.id);

    const uploaderInfo = await clerkClient.users.getUser(image.userId);

    return (
        <div className="flex w-full h-full min-w-0">
            <div className="flex-shrink flex justify-center items-center w-4/5">
                <img src={image.url} className="object-contain w-full h-full m-auto" alt="Opened Image" />
            </div>

            <div className="flex flex-col flex-shrink-0 border-l w-auto">
                <div className="border-b p-2 text-center text-lg">{image.name}</div>

                <div className="flex flex-col p-2">
                    <span>Uploaded By</span>
                    <span>{uploaderInfo.fullName}</span>
                </div>
                <div className="flex flex-col p-2">
                    <span>Created On</span>
                    <span>{new Date(image.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="p-2">
                    <form action={async () => {
                        "use server";

                        await deleteImage(props.id);
                    }}>
                        <Button type="submit" variant="destructive">Delete</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
