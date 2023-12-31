import type { LoaderFunction } from 'react-router-dom'
import { Link } from 'react-router-dom'

/**
 * The first page displayed when the app starts,
 * more to do some restore thing in loader.
 */
const BootPage = () => {
    // useEffect(() => {
    //     throw new Error('aaa')
    // }, [])

    return (
        <div className={'w-full h-full flex flex-col items-center'}>
            <h1>BootPage</h1>


            <Link to={'/misc'}>TO /misc</Link>
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