import type { UIMatch } from 'react-router-dom'
import { Outlet, useMatches, useNavigate } from 'react-router-dom'
import { Spacer } from '@/components/Spacer.tsx'
import { IconCross, IconMin } from '@/components/Icons.tsx'
import { manageImpl } from '@/platform_impl/manage.ts'
import type { RouteHandle } from '@/_types/route.ts'
import { Tooltip } from 'react-tooltip'
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react'
import { ModalImpl } from '@/utils/modal.ts'
import { LogImpl } from '@/utils/log.ts'

const ConditionalBack = () => {
    const navigate = useNavigate()
    const matches = useMatches() as UIMatch<unknown, RouteHandle>[]
    const showBack = matches.at(-1)!.handle?.showBack === true

    return showBack ? (
        <button className={'as-button'} onClick={() => navigate(-1)}>
            Back
        </button>
    ) : null
}

const RootInner = () => {
    return (
        <div className={
            'w-full h-full rounded-app bg-transparent border-app overflow-hidden flex flex-col items-center'
        }>
            {/* tooltips */}
            <Tooltip id={'base-tooltip'} className={'z-20'} style={{ fontSize: 12 }}/>
            {/* <Picker/> */}

            {/* header */}
            <div className={
                'z-20 w-full h-header px-4 bg-header text-header shadow-nav flex items-center'
            } data-tauri-drag-region="">
                <ConditionalBack/>

                <Spacer/>

                {/* operators */}
                <IconMin.Button className={'ml-4 as-button text-[18px]'} onClick={manageImpl.min}/>
                <IconCross.Button className={'ml-4 as-button text-[18px]'} onClick={manageImpl.close}/>
            </div>

            {/* body */}
            <div className={'w-full h-body bg-body shrink-0'}>
                <Outlet/>
            </div>
        </div>
    )
}

const RootLayout = () => {
    return (
        <NiceModalProvider>
            <RootInner/>
        </NiceModalProvider>
    )
}

let initialized = false
/**
 * initialize all plugins and restore necessary data from storage,
 * then redirect to the '/dashboard' route
 */
RootLayout.loader = async () => {
    // Make sure this loader only runs once per app lifecycle
    if (initialized) return null

    // Initialize all platform plugins here
    await LogImpl.prepare()
    ModalImpl.prepare()

    // Mark this loader as initialized
    initialized = true

    return null
}

export default RootLayout