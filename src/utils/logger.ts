class Logger {
    static #singleton: Logger

    constructor() {
        if (Logger.#singleton) {
            return Logger.#singleton
        }
        Logger.#singleton = this
    }

    // TODO: proxy all methods on log-plugin
}

const logger = new Logger()

export {
    logger
}