// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";


/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3gallery_${name}`);

export const images = createTable(
  "image",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),
    userId: varchar("userId", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("image_idx").on(example.name),
  })
);

export const albums = createTable(
  "album",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    userId: varchar("userId", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("album_idx").on(example.name)
  })
)


export const imagesToAlbums = createTable(
  "image_to_album",
  {
    imageId: integer("image_id").notNull().references(() => images.id),
    albumId: integer("album_id").notNull().references(() => albums.id),
    imageUrl: varchar("url", { length: 1024 }).notNull()
  },
  (example) => ({
    pk: primaryKey({ columns: [ example.imageId, example.albumId ] })
  })
)


export const imagesRelations = relations(images, ({ many }) => ({
  imagesToAlbums: many(imagesToAlbums)
}))

export const albumsRelations = relations(albums, ({ many }) => ({
  imagesToAlbums: many(imagesToAlbums)
}))

export const imagesToAlbumsRelations = relations(imagesToAlbums, ({ one }) => ({
  image: one(images, {
    fields: [imagesToAlbums.imageId],
    references: [images.id]
  }),
  album: one(albums, {
    fields: [imagesToAlbums.albumId],
    references: [albums.id]
  })
}));
