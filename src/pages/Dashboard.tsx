import { DateTimePicker } from '@/components/DateTimePicker.tsx'
import { useEffect } from 'react'
import { notifier } from '@/utils/notify.ts'
import { Link } from 'react-router-dom'

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
            <h1 className={'text-primary'}>text-primary: DashboardPage</h1>
            <h1 className={'text-secondary'}>text-secondary: DashboardPage</h1>
            <h1 className={'text-tertiary'}>text-tertiary: DashboardPage</h1>

            <br/><br/>

            <Link className={'underline underline-offset-4'} to={'/misc'}>to page /misc</Link>

            <br/><br/>

            <button onClick={() => {
                notifier.notify('xxx')
            }}>notify 1
            </button>
            <br/>
            <button onClick={() => {
                notifier.notify('标题5个字', '已过期')
            }}>notify 2
            </button>

            <br/><br/>

            <p>DatePicker</p>
            <DateTimePicker onSelected={d => {
                console.log(d.toLocaleString())
            }}/>
        </div>
    )
}

export default DashboardPage