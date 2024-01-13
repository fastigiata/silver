import type { RouteObject } from 'react-router-dom'
import { createHashRouter } from 'react-router-dom'

import bootLoader from './boot.ts'
import RootLayout from './layout.tsx'

import DashboardPage from '../pages/Dashboard'
import StickerPage from '../pages/Sticker'
import ExceptionPage from '../pages/Exception'
import MiscPage from '../pages/Misc'

const routes: RouteObject[] = [
    {
        errorElement: <ExceptionPage/>,
        element: <RootLayout/>,
        children: [
            {
                path: '/',
                loader: bootLoader,
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