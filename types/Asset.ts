import {z} from "zod";

export const nftAssetSchema = z.object({
    asset_id: z.string(),
    name: z.string(),
    picture: z.string().url(),
    external_link: z.string().url(),
    description: z.string(),
    collection: z.string(),
    supply: z.string(),
    royalties: z.bigint(),
    date_of_creation: z.date(),
});

export type NFTAsset = z.infer<typeof nftAssetSchema>;