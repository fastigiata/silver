import { Outlet, useLoaderData } from 'react-router-dom'

const StickerSpecLayout = () => {
    const loader = useLoaderData()

    return <Outlet context={loader}/>
}

export default StickerSpecLayout