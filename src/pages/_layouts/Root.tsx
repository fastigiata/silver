import type { UIMatch } from 'react-router-dom'
import { Outlet, useMatches, useNavigate } from 'react-router-dom'
import { logImpl } from '@/platform_impl/log.ts'
import { Spacer } from '@/components/Spacer.tsx'
import { IconCross, IconMin } from '@/components/Icons.tsx'
import { manageImpl } from '@/platform_impl/manage.ts'
import { Picker } from '@/components/Picker/impl.tsx'
import type { RouteHandle } from '@/_types/route.ts'

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

const RootLayout = () => {
    return (
        <div className={
            'w-full h-full rounded-app bg-transparent border-app overflow-hidden flex flex-col items-center'
        }>
            {/* tooltips */}
            <Picker/>

            {/* header */}
            <div className={
                'z-20 w-full h-header px-4 bg-header text-header shadow-nav flex items-center'
            } data-tauri-drag-region="">
                {/* TODO: add breadcrumb with 'handle'  */}
                {/* <Link className={''} to={'/dashboard'}>Home</Link> */}
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

let initialized = false
/**
 * initialize all plugins and restore necessary data from storage,
 * then redirect to the '/dashboard' route
 */
RootLayout.loader = async () => {
    // Make sure this loader only runs once per app lifecycle
    if (initialized) return null

    // Initialize all plugins here
    await logImpl.initialize()

    // FIXME: simulate a long boot time, remove this later
    console.log('bootLoader start')
    await new Promise(r => setTimeout(r, 300))
    console.log('bootLoader done')

    // Mark this loader as initialized
    initialized = true

    return null
}

export default RootLayout