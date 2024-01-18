import { Link, Outlet } from 'react-router-dom'
import { getCurrent } from '@tauri-apps/api/window'
import { logger } from '@/utils/log.ts'
import { exit } from '@tauri-apps/plugin-process'
import { Spacer } from '@/components/Spacer.tsx'
import { IconCross, IconSetting } from '@/components/Icons.tsx'

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
                <Link className={'underline underline-offset-4'} to={'/dashboard'}>Home</Link>
                <Link className={'underline underline-offset-4'} to={'/misc'}>Misc</Link>

                <button className={'icon-btn'} onClick={() => {
                    const win = getCurrent()
                    win.center()
                }}>center
                </button>
                <button onClick={() => {
                    // TODO: close the window using plugin 'process'
                    const win = getCurrent()
                    win.close()
                }}>close current
                </button>

                <Spacer/>

                <IconSetting className={'icon-btn text-[24px]'}/>
                <IconCross className={'icon-btn text-[24px]'} onClick={() => exit()}/>
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