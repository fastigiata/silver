import * as Icons from '@/components/Icons.tsx'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'
import { NotifyImpl } from '@/utils/notify.ts'

const MiscPage = () => {
    const sendNotify = () => {
        NotifyImpl.notify({
            title: `title ${new Date().toLocaleString()}`,
            data: {
                name: 'name',
                age: 18
            },
            onClick: (v) => {
                console.log('onClick', v)
                window.open('https://www.baidu.com', '_blank')
            }
        })
    }

    return (
        <AwesomeScrollbar className={'w-full h-full p-4'}>
            <button onClick={sendNotify}>send notify</button>
            <div className={'w-full h-[2px] my-2 bg-[#CCC]'}></div>
            <p>图标</p>
            <ul className={'space-y-2'}>
                {
                    Object.entries(Icons)
                        .map(([ name, Icon ]) => <li key={name} className={
                            'flex items-center space-x-4'
                        }>
                            <span>{name}: </span>
                            <Icon className={'text-[24px] text-[#ccc]'}/>
                        </li>)
                }
            </ul>
        </AwesomeScrollbar>
    )
}

export default MiscPage