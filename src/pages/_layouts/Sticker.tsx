import { Outlet, useLoaderData } from 'react-router-dom'

const StickerLayout = () => {
    const loader = useLoaderData()

    return <Outlet context={loader}/>
}

export default StickerLayout