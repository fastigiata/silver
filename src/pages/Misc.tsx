import * as Icons from '@/components/Icons.tsx'

const MiscPage = () => {
    return (
        <div className={'w-full h-full p-4'}>
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
        </div>
    )
}

export default MiscPage