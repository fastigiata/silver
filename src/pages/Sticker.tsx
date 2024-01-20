import type { LoaderFunction } from 'react-router-dom'

/**
 * Generally speaking,
 * this page should only be displayed when embedded and should not be seen on the web page.
 * When embedded, it occupies the entire window to simulate a sticky note.
 */
const StickerPage = () => {
    return (
        <div>
            <h1>StickerPage</h1>
        </div>
    )
}

/**
 * Loads the sticker from the storage
 */
const stickerLoader: LoaderFunction = () => {
    return null
}

StickerPage.loader = stickerLoader

export default StickerPage