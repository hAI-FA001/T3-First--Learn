import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { albums, images, imagesToAlbums } from "./db/schema";
import { and, count, eq, inArray } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

export async function getImages(skip: number, limit: number) {
  const user = auth();

  if (!user.userId) throw new Error('Unauthorized');

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { asc }) => asc(model.id),
    offset: skip,
    limit: limit
  });

  return images;
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error('Unauthorized');

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  })
  if (!image) throw new Error('Image not found');

  if (image.userId !== user.userId) throw new Error('Unauthorized');

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db.delete(images).where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    }
  });

  redirect("/");
}

export async function getImageCount() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const imageCount = await db.select({ count: count() }).from(images).where(eq(images.userId, user.userId));

  return imageCount[0]?.count ?? 0;
}

export async function getAlbums() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const albums = await db.query.albums.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { asc }) => asc(model.id)
  })

  return albums;
}

export async function addImagesToAlbum(imageIds: number[], albumId: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  for (const imageId of imageIds) {
    const url = (await db.select({ url: images.url }).from(images)
      .where(and(eq(images.id, imageId), eq(images.userId, user.userId)))
      .limit(1))[0]?.url ?? "";

    await db.insert(imagesToAlbums)
      .values({
                imageId: imageId,
                albumId: albumId,
                imageUrl: url,
            }).onConflictDoNothing();
  }
}

export async function addAlbum(name: string) {
  const user = auth();
  
  if (!user.userId) throw new Error("Unauthorized");

  await db.insert(albums).values({
    name: name,
    userId: user.userId
  })
}

export async function getAlbumImages(id: number, skip: number, limit: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const imagesInAlbum = await db.query.imagesToAlbums.findMany({
    where: (model, { eq }) => eq(model.albumId, id),
    offset: skip,
    limit: limit,
    with: {
      image: true
    }
  });
  const images = imagesInAlbum.map(image => image.image);

  return images;
}

export async function getAlbumImageCount(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const imageCount = await db.select({ count: count() }).from(imagesToAlbums).where(eq(imagesToAlbums.albumId, id));

  return imageCount[0]?.count ?? 0;
}

export async function removeImagesFromAlbum(imageIds: number[], albumId: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  await db.delete(imagesToAlbums).where(and(inArray(imagesToAlbums.imageId, imageIds), eq(imagesToAlbums.albumId, albumId)));
}