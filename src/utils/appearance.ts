import { config as c } from '@/configs/appearence.json'
import { logger } from '@/utils/log.ts'

const DefaultConfig = c as AppearanceItem[]

export type EditConfig = { type: 'color', withAlpha: boolean }
    | { type: 'enum', values: string[] }
    | { type: 'length', min: number, max: number, step?: number }

export type AppearanceSeparator = { separator: true, title: string }
export type AppearanceConfigurable = {
    /**
     * display name
     */
    name: string
    /**
     * css variable name
     */
    bind: string
    /**
     * default value
     */
    reset: string
    /**
     * current applied value
     */
    value?: string
    /**
     * edit config for this item
     */
    editConfig: EditConfig
}
export type AppearanceItem = AppearanceConfigurable | AppearanceSeparator

/**
 * Note: await `appearance.ready` before using it
 */
class Appearance {
    #config!: AppearanceItem[]
    #listeners = new Set<(config: AppearanceItem[]) => void>()

    get config() {
        return this.#config
    }

    /**
     * sync the appearance config to storage
     */
    sync() {
        localStorage.setItem('@appearance', JSON.stringify(this.#config))
        logger.info('appearance config synced')
    }

    /**
     * load the appearance config from storage
     */
    restore() {
        // TODO: use indexedDB instead
        const raw = localStorage.getItem('@appearance')
        if (raw) {
            this.#config = JSON.parse(raw)
            this.#config.forEach(item => {
                if ('bind' in item) {
                    document.documentElement.style.setProperty(item.bind, item.value || item.reset)
                }
            })
            logger.info('appearance config restored')
        } else {
            this.#config = DefaultConfig
        }
    }

    constructor() {
        // restore the appearance config from storage
        this.restore()
    }

    /**
     * subscribe to the appearance config change
     */
    subscribe(onChange: (config: AppearanceItem[]) => void) {
        this.#listeners.add(onChange)
    }

    unSubscribe(onChange: (config: AppearanceItem[]) => void) {
        this.#listeners.delete(onChange)
    }

    private afterChange() {
        // notify all subscribers
        this.#listeners.forEach(listener => listener(this.#config))

        // sync the appearance config to storage
        this.sync()
    }

    // TODO: use map instead forEach
    modify(bind: string, to: string) {
        this.#config.forEach((item => {
            if ('bind' in item && item.bind === bind) {
                item.value = to
                document.documentElement.style.setProperty(bind, to)
            }
        }))
        this.afterChange()
    }

    reset() {
        this.#config = DefaultConfig
        this.#config.forEach(item => {
            if ('bind' in item) {
                document.documentElement.style.setProperty(item.bind, item.reset)
            }
        })
        this.afterChange()
    }
}

const appearance = new Appearance()

export {
    appearance
}