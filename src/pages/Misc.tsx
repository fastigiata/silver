import { Window, getAll } from '@tauri-apps/api/window'
import { useState } from 'react'

const createWindow = (label: string) => {
    const win = new Window(label || 'unknown', {})
    win.setSkipTaskbar(true)
}

const MiscPage = () => {
    const [ label, setLabel ] = useState('')

    const [ wins, setWins ] = useState<Window[]>([])

    return (
        <div>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)}/>
            <button onClick={() => createWindow(label)}>创建窗口</button>
            <button onClick={() => createWindow(label)}>销毁窗口</button>
            <button onClick={() => setWins(getAll())}>查看所有窗口</button>
            <ul>
                {
                    wins.map(win => <li key={win.label}>{win.label}</li>)
                }
            </ul>
        </div>
    )
}

export {
    MiscPage
}