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

    /**
     * Verbose logging, for debugging.
     */
    verbose(s: string): void

    /**
     * General information.
     */
    info(s: string): void

    /**
     * Something unexpected but not necessarily an error.
     */
    warn(s: string): void

    /**
     * Something failed but the program can continue.
     */
    error(s: string): void

    /**
     * Indicates some error that should not happen.
     */
    fatal(s: string): void
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

    fatal(s: string) {
        error(`[FATAL] ${s}`)
    }
}

class WebLogger implements Logger {
    public async initialize() {
        // no-op
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

    fatal(s: string) {
        console.error(`[FATAL] ${s}`)
    }
}

const logger: Logger = Env.isEmbed ? new EmbedLogger() : new WebLogger()

export {
    logger
}