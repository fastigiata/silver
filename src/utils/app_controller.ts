import { Env } from '@/utils/env.ts'
import { exit } from '@tauri-apps/plugin-process'

abstract class AppController {
    public static async hideToTray() {
        // TODO: Implement
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