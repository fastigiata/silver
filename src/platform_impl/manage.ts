import { exit } from '@tauri-apps/plugin-process'
import { getCurrent } from '@tauri-apps/api/window'
import { isEmbed } from '@/utils/env.ts'

interface AppManager {
    min(): Promise<void>

    close(): Promise<void>
}

class WebManager implements AppManager {
    async min(): Promise<void> {
        alert('Not Supported on Web')
    }

    async close(): Promise<void> {
        alert('Not Supported on Web')
    }
}

class EmbedManager {
    min() {
        return getCurrent().minimize()
    }

    close() {
        return exit()
    }
}

const manageImpl: AppManager = isEmbed ? new EmbedManager() : new WebManager()

export {
    manageImpl
}