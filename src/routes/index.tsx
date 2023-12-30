import type { RouteObject } from 'react-router-dom'
import { createHashRouter } from 'react-router-dom'
import { bootLoader, BootPage } from '../pages/Boot'
import { ExceptionPage } from '../pages/Exception'
import { DashboardPage } from '../pages/Dashboard'
import { stickerLoader, StickerPage } from '../pages/Sticker'

const routes: RouteObject[] = [
    {
        errorElement: <ExceptionPage/>,
        children: [
            {
                path: '/',
                loader: bootLoader,
                element: <BootPage/>,
            },
            {
                path: '/dashboard',
                element: <DashboardPage/>,
            },
            {
                path: '/sticker/:stickerId?',
                loader: stickerLoader,
                element: <StickerPage/>
            }
        ]
    }
]

const router = createHashRouter(routes)

export {
    router
}