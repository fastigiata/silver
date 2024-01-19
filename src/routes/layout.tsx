import { Link, Outlet } from 'react-router-dom'
import { logger } from '@/utils/log.ts'
import { Spacer } from '@/components/Spacer.tsx'
import { IconBell, IconCross, IconTriDot } from '@/components/Icons.tsx'
import { AppController } from '@/utils/app_controller.ts'

import Sticker from '@/assets/Sticker.svg'

const RootLayout = () => {
    // useEffect(() => {
    //     const win = getCurrent()
    //     win.show()
    // }, [])

    return (
        <div className={
            'w-full h-full rounded-app bg-transparent text-primary overflow-hidden flex flex-col items-center'
        }>
            {/* header */}
            <div className={
                'z-1 w-full h-header px-4 bg-header text-header shadow-nav flex items-center'
            } data-tauri-drag-region="">
                {/* logo */}
                <Link className={'h-[80%]'} to={'/dashboard'}>
                    <img className={'h-full'} src={Sticker} alt=""/>
                </Link>

                <Spacer/>

                {/* operators */}
                <IconBell.Button className={'ml-4 icon-btn text-[18px]'}/>
                <IconTriDot.Button className={'ml-4 icon-btn text-[18px]'}/>
                <IconCross.Button className={'ml-4 icon-btn text-[18px]'} onClick={AppController.close}/>
            </div>

            {/* body */}
            <div className={'w-full flex-1 bg-body shrink-0'}>
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