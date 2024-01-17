import { DateTimePicker } from '@/components/DateTimePicker.tsx'
import { useEffect } from 'react'
import { notifier } from '@/utils/notify.ts'

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

            <button onClick={() => {
                notifier.notify('xxx')
            }}>notify
            </button>
            <button onClick={() => {
                notifier.notify('标题5个字', '已过期')
            }}>notify
            </button>

            <DateTimePicker onSelected={d => {
                console.log(d.toLocaleString())
            }}/>
        </div>
    )
}

export default DashboardPage