import type { RouteObject } from 'react-router-dom'
import { createHashRouter, redirect } from 'react-router-dom'

import RootLayout from './layout'
import ExceptionPage from '@/pages/Exception'
import DashboardPage from '@/pages/Dashboard'
import CollectionPage from '@/pages/Collection'
import StickerPage from '@/pages/Sticker.tsx'
import AppearancePage from '@/pages/Appearance'
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
                loader: DashboardPage.loader,
                action: DashboardPage.action,
                element: <DashboardPage/>,
            },
            {
                path: '/collection/:collectionId?',
                loader: CollectionPage.loader,
                element: <CollectionPage/>,
            },
            {
                path: '/sticker/:stickerId?',
                loader: StickerPage.loader,
                element: <StickerPage/>
            },
            {
                path: '/appearance',
                element: <AppearancePage/>
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