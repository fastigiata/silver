import type { LoaderFunction } from 'react-router-dom'
import { attachConsole } from '@tauri-apps/plugin-log'
import { isEmbed } from '../env'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return <Outlet/>
}

const RootLoader: LoaderFunction = async () => {
    // Initialize plugins
    if (isEmbed) {
        await attachConsole()
    }

    return null
}

RootLayout.loader = RootLoader


export default RootLayout