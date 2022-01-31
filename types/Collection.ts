import {z} from "zod";

export const nftCollectionSchema = z.object({
    external_link: z.string().url(),
    picture: z.string().url(),
    name: z.string(),
    description: z.string(),
    royalties: z.string().regex(/^[0-9]+$/),
    supply: z.string().regex(/^[0-9]+$/),
    collection: z.number().optional(),
    date_of_creation: z.date().optional()
});

export type NFTCollection = z.infer<typeof nftCollectionSchema>;