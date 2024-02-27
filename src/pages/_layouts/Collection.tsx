import { Outlet, useLoaderData } from 'react-router-dom'

const CollectionLayout = () => {
    const loader = useLoaderData()

    return <Outlet context={loader}/>
}

export default CollectionLayout