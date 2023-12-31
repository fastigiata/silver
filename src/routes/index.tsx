import type { RouteObject } from 'react-router-dom'
import { createHashRouter } from 'react-router-dom'
import BootPage from '../pages/Boot'
import { ExceptionPage } from '../pages/Exception'
import { DashboardPage } from '../pages/Dashboard'
import StickerPage from '../pages/Sticker'
import MiscPage from '../pages/Misc'

const routes: RouteObject[] = [
    {
        errorElement: <ExceptionPage/>,
        children: [
            {
                path: '/',
                loader: BootPage.loader,
                element: <BootPage/>,
            },
            {
                path: '/dashboard',
                element: <DashboardPage/>,
            },
            {
                path: '/sticker/:stickerId?',
                loader: StickerPage.loader,
                element: <StickerPage/>
            },
            {
                path: '/misc',
                element: <MiscPage/>
            }
        ]
    }
]

const router = createHashRouter(routes)

export {
    router
}