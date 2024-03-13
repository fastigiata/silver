import { runEmbed } from '@/utils/env.ts'
import { debug, error, info, warn } from '@tauri-apps/plugin-log'

interface LogExecutor {
    debug(s: string): void

    info(s: string): void

    warn(s: string): void

    error(s: string): void
}

const executor: LogExecutor = runEmbed ? { debug, info, warn, error } : console

abstract class LogImpl {
    public static verbose(s: string) {
        executor.debug(s)
    }

    public static info(s: string) {
        executor.info(s)
    }

    public static warn(s: string) {
        executor.warn(s)
    }

    public static error(s: string) {
        executor.error(s)
    }

    public static fatal(s: string) {
        executor.error(`[FATAL] ${s}`)
    }
}

export {
    LogImpl
}