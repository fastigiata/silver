import type { LoaderFunction } from 'react-router-dom'

/**
 * The first page displayed when the app starts,
 * more to do some restore thing in loader.
 */
const BootPage = () => {
    // useEffect(() => {
    //     throw new Error('aaa')
    // }, [])

    return (
        <div>
            <h1>BootPage</h1>
            <button onClick={() => {
                throw new Error('xxx')
            }}>throw an error
            </button>
        </div>
    )
}

/**
 * Detect the environment (web or embedded) and loads all necessary data from storage.
 */
const bootLoader: LoaderFunction = () => {
    return null
}

BootPage.loader = bootLoader

export default BootPage