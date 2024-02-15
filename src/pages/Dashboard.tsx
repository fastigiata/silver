import { DateTimePicker } from '@/components/DateTimePicker.tsx'
import { useEffect } from 'react'
import { notifyImpl } from '@/platform_impl/notify.ts'
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
            <h1 className={'text-primary font-primary'}>text-primary: DashboardPage</h1>
            <h1 className={'text-secondary font-secondary'}>text-secondary: DashboardPage</h1>
            <h1 className={'text-tertiary font-tertiary'}>text-tertiary: DashboardPage</h1>

            <br/><br/>

            <Link className={'underline underline-offset-4'} to={'/misc'}>to page /misc</Link>

            <br/><br/>

            <button onClick={() => {
                notifyImpl.notify('xxx')
            }}>notify 1
            </button>
            <br/>
            <button onClick={() => {
                notifyImpl.notify('标题5个字', '已过期')
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