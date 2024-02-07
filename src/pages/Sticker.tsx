import type { LoaderFunction } from 'react-router-dom'

/**
 * details of the sticker, display/manage a single sticker
 */
const StickerPage = () => {
    return (
        <div>
            <h1>StickerPage</h1>
        </div>
    )
}

/**
 * get details of the sticker from the storage, return `null` if not found.
 */
const stickerLoader: LoaderFunction = () => {
    // TODO: get details of the sticker from the storage
    return null
}

StickerPage.loader = stickerLoader

export default StickerPage