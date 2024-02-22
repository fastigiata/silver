import { DateTimePicker } from '@/components/DateTimePicker.tsx'
import { Suspense, useEffect } from 'react'
import { notifyImpl } from '@/platform_impl/notify.ts'
import { Await, defer, Link, useLoaderData } from 'react-router-dom'
import { Loading } from '@/components/Loading.tsx'
import { CollectionDB } from '@/db/collection.ts'
import type { ICollection } from '@/_types/collection.ts'

type Loader = {
    collection: Promise<ICollection[]>
}

/**
 * dashboard to manage all stickers
 */
const DashboardPage = () => {
    const loader: Loader = useLoaderData()

    useEffect(() => {
        console.log('DashboardPage useEffect')
        console.log(loader)
    }, [ loader ])


    return (
        <div className={''}>
            <Suspense fallback={<Loading/>}>
                <Await resolve={loader.collection}>
                    {v => {
                        console.log('xx', v)

                        return <p>xxx</p>
                    }}
                    {/* {(list: ICollection[]) => list?.map(item => { */}
                    {/*     return <p>{JSON.stringify(item)}</p> */}
                    {/* })} */}
                </Await>
            </Suspense>

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

DashboardPage.loader = async () => {
    return defer({
        // TODO: fix promise
        collection: CollectionDB.list()
    } satisfies Loader)
}

export default DashboardPage