import * as Icons from '@/components/Icons.tsx'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'

const MiscPage = () => {
    return (
        <AwesomeScrollbar className={'w-full h-full p-4'}>
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