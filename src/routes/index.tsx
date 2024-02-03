import type { RouteObject } from 'react-router-dom'
import { createHashRouter, redirect } from 'react-router-dom'

import RootLayout from './layout'
import ExceptionPage from '@/pages/Exception'
import DashboardPage from '@/pages/Dashboard'
import AppearancePage from '@/pages/Appearance'
import StickerPage from '@/pages/Sticker'
import MiscPage from '@/pages/Misc'


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
                path: '/appearance',
                element: <AppearancePage/>
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