import { Env } from '@/utils/env.ts'
import { exit } from '@tauri-apps/plugin-process'
import { getCurrent } from '@tauri-apps/api/window'

class AppController {
    public async hideToTray() {
        // TODO: Implement
        console.debug('TODO')
        return getCurrent().minimize()
    }

    public async close() {
        if (Env.isEmbed) {
            await exit()
        } else {
            window.close()
        }
    }
}

const appController = new AppController()

export {
    appController
}