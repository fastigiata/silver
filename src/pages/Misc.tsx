import * as Icons from '@/components/Icons.tsx'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'

class MyClass {
    #inner = 1

    mutate() {
        this.#inner += 1
    }
}

const myClass = new MyClass()

const MiscPage = () => {

    return (
        <AwesomeScrollbar className={'w-full h-full p-4'}>
            <button
                className={'border-[1px] border-[#CCC]'}
                onClick={myClass.mutate}>
                mutate myClass
            </button>

            <div className={'w-full h-[1px] my-8 bg-primary-button'}/>
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