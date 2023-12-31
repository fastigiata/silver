import { Window, getAll } from '@tauri-apps/api/window'
import { useState } from 'react'
import { attachConsole, info } from '@tauri-apps/plugin-log'

const createWindow = (label: string) => {
    const win = new Window(label || 'unknown', {})
}

// TODO: move to main.tsx
attachConsole()

const MiscPage = () => {
    const [ label, setLabel ] = useState('')

    const [ wins, setWins ] = useState<Window[]>([])

    return (
        <div>
            <input className={'border-2'} type="text" value={label} onChange={e => setLabel(e.target.value)}/> <br/>
            <button onClick={() => info(label)}>info</button>
            <br/>
            <button onClick={() => createWindow(label)}>创建窗口</button>
            <br/>
            <button onClick={() => setWins(getAll())}>查看所有窗口</button>
            <br/>
            <ul>
                {
                    wins.map(win => <li key={win.label}>{win.label}</li>)
                }
            </ul>
        </div>
    )
}

export default MiscPage