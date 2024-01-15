import { Link, Outlet } from 'react-router-dom'
import { logger } from '@/utils/log.ts'

const RootLayout = () => {
    return (
        <div className={'w-full h-full flex flex-col items-center'}>
            {/* header */}
            <div className={'w-full h-header bg-header text-header shadow-nav'}>
                <Link className={'underline underline-offset-4'} to={'/dashboard'}>Home</Link>
                <Link className={'underline underline-offset-4'} to={'/misc'}>Misc</Link>
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