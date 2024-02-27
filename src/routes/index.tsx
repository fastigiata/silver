import type { RouteObject } from 'react-router-dom'
import { createHashRouter, redirect } from 'react-router-dom'

import RootLayout from '@/pages/_layouts/Root.tsx'
import ExceptionPage from '@/pages/Exception'
import CollectionSpecLayout from '@/pages/_layouts/CollectionSpec.tsx'
import CollectionCreate from '@/pages/collection/Create.tsx'
import CollectionModify from '@/pages/collection/Modify.tsx'
import CollectionView from '@/pages/collection/View.tsx'
import StickerSpecLayout from '@/pages/_layouts/StickerSpec.tsx'
import StickerCreate from '@/pages/sticker/Create.tsx'
import StickerView from '@/pages/sticker/View.tsx'
import StickerModify from '@/pages/sticker/Modify.tsx'
import AppearancePage from '@/pages/Appearance'
import MiscPage from '@/pages/Misc'

import DashboardPage from '@/pages/Dashboard'
import CollectionPage from '@/pages/Collection'
import StickerPage from '@/pages/Sticker.tsx'

const routes: RouteObject[] = [
    {
        errorElement: <ExceptionPage/>,
        loader: RootLayout.loader,
        element: <RootLayout/>,
        children: [
            {
                path: '/',
                loader: () => redirect('/lists'),
            },
            {
                path: '/collection/create',
                element: <CollectionCreate/>
            },
            {
                path: '/collection/:collectionId',
                element: <CollectionSpecLayout/>,
                children: [
                    {
                        path: 'view',
                        element: <CollectionView/>
                    },
                    {
                        path: 'modify',
                        element: <CollectionModify/>
                    },
                ],
            },
            {
                path: '/sticker/create',
                element: <StickerCreate/>
            },
            {
                path: '/sticker/:stickerId',
                element: <StickerSpecLayout/>,
                children: [
                    {
                        path: 'view',
                        element: <StickerView/>
                    },
                    {
                        path: 'modify',
                        element: <StickerModify/>
                    },
                ]
            },


            // TODO: refactor below
            // {
            //     path: '/',
            //     loader: () => redirect('/dashboard'),
            // },
            // {
            //     path: '/dashboard',
            //     loader: DashboardPage.loader,
            //     action: DashboardPage.action,
            //     element: <DashboardPage/>,
            // },
            // {
            //     path: '/collection/:collectionId?',
            //     loader: CollectionPage.loader,
            //     element: <CollectionPage/>,
            // },
            // {
            //     path: '/sticker/:stickerId?',
            //     loader: StickerPage.loader,
            //     element: <StickerPage/>
            // },
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