import { Env } from '@/utils/env.ts'
import { exit } from '@tauri-apps/plugin-process'

abstract class AppController {
    public static async hideToTray() {
        // TODO: Implement
        console.debug('TODO')
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