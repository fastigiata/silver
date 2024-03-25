import type { UIMatch } from 'react-router-dom'
import { Outlet, redirect, useLocation, useMatches, useNavigate } from 'react-router-dom'
import { Spacer } from '@/components/Spacer.tsx'
import { IconCross, IconMin, IconSetting } from '@/components/Icons.tsx'
import { manageImpl } from '@/platform_impl/manage.ts'
import type { RouteHandle } from '@/_types/route.ts'
import { Tooltip } from 'react-tooltip'
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react'
import { ModalImpl } from '@/utils/modal.ts'
import { LogImpl } from '@/utils/log.ts'
import { NotifyImpl } from '@/utils/notify.ts'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { WebStorageKeys } from '@/_constants/web_storage.ts'

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
    const navigate = useNavigate()

    return (
        <div className={
            'w-full h-full rounded-app bg-transparent border-app overflow-hidden flex flex-col items-center'
        }>
            {/* tooltips */}
            <Tooltip id={'base-tooltip'} className={'z-20'} style={{ fontSize: 12 }}/>
            {/* <Picker/> */}

            {/* toaster */}
            <Toaster/>

            {/* header */}
            <div className={
                'z-20 w-full h-header px-4 bg-header text-header shadow-nav flex items-center'
            } data-tauri-drag-region="">
                <ConditionalBack/>

                <Spacer/>

                {/* operators */}
                <IconMin.Button className={'ml-4 as-button text-[18px]'} onClick={manageImpl.min}/>
                <IconSetting.Button className={'ml-4 as-button text-[18px]'} onClick={() => navigate('/setting')}/>
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
    const lo = useLocation()

    useEffect(() => {
        LogImpl.verbose(`[RootLayout] update last view to [${lo.pathname}]`)
        window.onbeforeunload = () => {
            localStorage.setItem(WebStorageKeys.LastView, lo.pathname)
        }
    }, [ lo ])

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
    await NotifyImpl.prepare()
    ModalImpl.prepare()

    // Mark this loader as initialized
    initialized = true

    // Restore last view
    const lastView = localStorage.getItem(WebStorageKeys.LastView)
    if (!!lastView) {
        LogImpl.verbose(`[RootLayout] restore last view [${lastView}]`)
        return redirect(lastView)
    }

    // Redirect to the dashboard (default) view
    return redirect('/dashboard')
}

export default RootLayout