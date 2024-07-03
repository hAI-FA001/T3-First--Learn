import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, count, eq } from "drizzle-orm";
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

  return imageCount;
}