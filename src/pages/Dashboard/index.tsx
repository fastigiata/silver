import { DateTimePicker } from '@/components/DateTimePicker.tsx'
import { useEffect } from 'react'
import { notifier } from '@/utils/notify.ts'

import { channels, isPermissionGranted, requestPermission, sendNotification, } from '@tauri-apps/plugin-notification'

/**
 * dashboard to manage all stickers
 */
const DashboardPage = () => {
    useEffect(() => {
        // console.log()
    }, [])

    return (
        <div className={''}>
            <p>Since there is no dashboard yet, this is a draft page</p>
            <br/><br/>
            <h1 className={'text-primary'}>DashboardPage</h1>
            <h1 className={'text-secondary'}>DashboardPage</h1>
            <h1 className={'text-tertiary'}>DashboardPage</h1>

            <button onClick={async () => {
                const v = await isPermissionGranted()
                console.log(`isPermissionGranted: ${v}`)
            }}>isPermissionGranted
            </button>
            <br/>

            <button onClick={async () => {
                const per = await requestPermission()
                console.log(per)
            }}>requestPermission
            </button>
            <br/>

            <button onClick={async () => {
                sendNotification('xxasdasd')
            }}>sendNotification
            </button>
            <br/>

            <button onClick={async () => {
                const notificationChannels = await channels()
                console.log(notificationChannels)
            }}>channels
            </button>
            <br/>

            <button onClick={() => {
                notifier.notify('xxx')
            }}>notify
            </button>

            <DateTimePicker onSelected={d => {
                console.log(d.toLocaleString())
            }}/>
        </div>
    )
}

export default DashboardPage