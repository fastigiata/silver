import type { RouteObject } from 'react-router-dom'
import { createHashRouter, redirect } from 'react-router-dom'

import RootLayout from './layout'
import DashboardPage from '@/pages/Dashboard'
import StickerPage from '@/pages/Sticker'
import ExceptionPage from '@/pages/Exception'
import MiscPage from '@/pages/Misc'
import PalettePage from '@/pages/Palette'

const routes: RouteObject[] = [
    {
        errorElement: <ExceptionPage/>,
        loader: RootLayout.loader,
        element: <RootLayout/>,
        children: [
            {
                path: '/',
                loader: () => redirect('/dashboard'),
            },
            {
                path: '/dashboard',
                element: <DashboardPage/>,
            },
            {
                path: '/palette',
                element: <PalettePage/>
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