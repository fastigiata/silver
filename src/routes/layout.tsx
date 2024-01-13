import type { LoaderFunction } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { logger } from '../utils/logger.ts'

const RootLayout = () => {
    return <Outlet/>
}

const RootLoader: LoaderFunction = async () => {
    // Initialize plugins here
    await logger.initialize()

    return null
}

RootLayout.loader = RootLoader


export default RootLayout