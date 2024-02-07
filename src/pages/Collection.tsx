import type { LoaderFunction } from 'react-router-dom'

/**
 * listview of all stickers in the collection
 */
const CollectionPage = () => {
    return (
        <div className={''}>
            <p>Collection Page</p>
            <ul>
                <li>sticker 1</li>
                <li>sticker 2</li>
                <li>sticker 3</li>
                <li>...</li>
            </ul>
        </div>
    )
}

/**
 * get all stickers in the collection from the storage, return `null` if not found.
 */
const collectionLoader: LoaderFunction = () => {
    // TODO: get all stickers in the collection from the storage
    return null
}

CollectionPage.loader = collectionLoader

export default CollectionPage