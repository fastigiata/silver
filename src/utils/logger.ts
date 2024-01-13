import {
    attachConsole,
    debug,
    info,
    warn,
    error,
} from '@tauri-apps/plugin-log'
import { Env } from './env.ts'

interface Logger {
    initialize(): Promise<void>

    verbose(s: string): void

    info(s: string): void

    warn(s: string): void

    error(s: string): void
}

class EmbedLogger implements Logger {
    public async initialize() {
        await attachConsole()
    }

    verbose(s: string) {
        debug(s)
    }

    info(s: string) {
        info(s)
    }

    warn(s: string) {
        warn(s)
    }

    error(s: string) {
        error(s)
    }
}

class WebLogger implements Logger {
    public async initialize() {
    }

    verbose(s: string) {
        console.debug(s)
    }

    info(s: string) {
        console.info(s)
    }

    warn(s: string) {
        console.warn(s)
    }

    error(s: string) {
        console.error(s)
    }
}

const logger: Logger = Env.isEmbed ? new EmbedLogger() : new WebLogger()

export {
    logger
}