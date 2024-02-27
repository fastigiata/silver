import { Outlet, useLoaderData } from 'react-router-dom'

const CollectionSpecLayout = () => {
    const loader = useLoaderData()

    return <Outlet context={loader}/>
}

export default CollectionSpecLayout