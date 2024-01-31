import { Link, Outlet, useNavigate } from 'react-router-dom'
import { logger } from '@/utils/log.ts'
import { Spacer } from '@/components/Spacer.tsx'
import { IconCross, IconMin, IconPalette } from '@/components/Icons.tsx'
import { Tooltips } from '@/tooltips'
import { AppController } from '@/utils/app_controller.ts'

const RootLayout = () => {
    const navigate = useNavigate()

    return (
        <div className={
            'w-full h-full rounded-app bg-transparent border-app overflow-hidden flex flex-col items-center'
        }>
            {/* tooltips */}
            <Tooltips/>

            {/* header */}
            <div className={
                'z-20 w-full h-header px-4 bg-header text-header shadow-nav flex items-center'
            } data-tauri-drag-region="">
                {/* logo */}
                {/* <Link className={'h-[80%]'} to={'/dashboard'}> */}
                {/*     <img className={'h-full'} src={Sticker} alt=""/> */}
                {/* </Link> */}
                <Link className={''} to={'/dashboard'}>Home</Link>

                <Spacer/>

                {/* operators */}
                <IconPalette.Button className={'ml-4 as-button text-[18px]'} onClick={() => navigate('/palette')}/>
                <IconMin.Button className={'ml-4 as-button text-[18px]'} onClick={AppController.hideToTray}/>
                <IconCross.Button className={'ml-4 as-button text-[18px]'} onClick={AppController.close}/>
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
    await logger.initialize()

    // FIXME: simulate a long boot time, remove this later
    console.log('bootLoader start')
    await new Promise(r => setTimeout(r, 300))
    console.log('bootLoader done')

    // Mark this loader as initialized
    initialized = true

    return null
}

export default RootLayout