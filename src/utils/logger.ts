import {
    attachConsole,
    debug,
    info,
    warn,
    error,
} from '@tauri-apps/plugin-log'
import { Env } from './env.ts'

abstract class Logger {
    abstract initialize(): Promise<void>

    abstract verbose(s: string): void

    abstract info(s: string): void

    abstract warn(s: string): void

    abstract error(s: string): void
}

class EmbedLogger extends Logger {
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

class WebLogger extends Logger {
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