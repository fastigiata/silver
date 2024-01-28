import { Env } from '@/utils/env.ts'
import { exit } from '@tauri-apps/plugin-process'
import { getCurrent } from '@tauri-apps/api/window'

abstract class AppController {
    public static async hideToTray() {
        // TODO: Implement
        console.debug('TODO')
        return getCurrent().minimize()
    }

    public static async close() {
        if (Env.isEmbed) {
            await exit()
        } else {
            window.close()
        }
    }
}

export {
    AppController
}