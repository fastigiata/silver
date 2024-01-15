import { DateTimePicker } from '../../components/DateTimePicker.tsx'
import { useEffect } from 'react'
import { notifier } from '@/utils/notify.ts'

/**
 * dashboard to manage all stickers
 */
const DashboardPage = () => {
    useEffect(() => {
        window.addEventListener('notificationclick', (ev) => {
            console.log(ev)
        })
    }, [])

    return (
        <div className={''}>
            <p>Since there is no dashboard yet, this is a draft page</p>
            <br/><br/>
            <h1 className={'text-primary'}>DashboardPage</h1>
            <h1 className={'text-secondary'}>DashboardPage</h1>
            <h1 className={'text-tertiary'}>DashboardPage</h1>

            <button onClick={() => {
                notifier.notify('xxx')
            }}>notify</button>

            <DateTimePicker onSelected={d => {
                console.log(d.toLocaleString())
            }}/>
        </div>
    )
}

export default DashboardPage