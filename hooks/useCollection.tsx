
import * as React from "react"
import { NFTCollection } from "../types/Collection";

export const CollectionsContext = React.createContext<CollectionContext | null>(null);

export function CollectionsProvider(props: any) {
    const [collections, setCollection] = React.useState<Collections>([]);

    const pushCollection = (collection: NFTCollection) => {
        setCollection(current => [...current, collection]);
    }

    return <CollectionsContext.Provider value={{
        collections,
        pushCollection,
        length: collections.length,
    }}>
        {props.children}
    </CollectionsContext.Provider>
}

export function useCollection() {
    return React.useContext(CollectionsContext as any) as CollectionContext;
}

export type Collections = Array<NFTCollection>
export interface CollectionContext {
    collections: Collections;
    pushCollection: (collection: NFTCollection) => void,
    length: number,
}