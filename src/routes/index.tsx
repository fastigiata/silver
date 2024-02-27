import type { RouteObject } from 'react-router-dom'
import { createHashRouter, redirect } from 'react-router-dom'

import RootLayout from '@/pages/_layouts/Root.tsx'
import ExceptionPage from '@/pages/Exception'
import DashboardPage from '@/pages/Dashboard'
import CollectionLayout from '@/pages/_layouts/Collection.tsx'
import CollectionCreatePage from '@/pages/collection/Create.tsx'
import CollectionModifyPage from '@/pages/collection/Modify.tsx'
import CollectionViewPage from '@/pages/collection/View.tsx'
import StickerLayout from '@/pages/_layouts/Sticker.tsx'
import StickerCreatePage from '@/pages/sticker/Create.tsx'
import StickerViewPage from '@/pages/sticker/View.tsx'
import StickerModifyPage from '@/pages/sticker/Modify.tsx'
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
                element: <DashboardPage/>
            },
            {
                path: '/collection/create',
                action: CollectionCreatePage.action,
                element: <CollectionCreatePage/>
            },
            {
                path: '/collection/:collectionId',
                element: <CollectionLayout/>,
                children: [
                    {
                        path: 'view',
                        element: <CollectionViewPage/>
                    },
                    {
                        path: 'modify',
                        element: <CollectionModifyPage/>
                    },
                ],
            },
            {
                path: '/sticker/create',
                element: <StickerCreatePage/>
            },
            {
                path: '/sticker/:stickerId',
                element: <StickerLayout/>,
                children: [
                    {
                        path: 'view',
                        element: <StickerViewPage/>
                    },
                    {
                        path: 'modify',
                        element: <StickerModifyPage/>
                    },
                ]
            },
            {
                path: '/appearance',
                element: <AppearancePage/>
            },
            {
                path: '/misc',
                element: <MiscPage/>
            },
        ]
    }
]

const router = createHashRouter(routes)

export {
    router
}