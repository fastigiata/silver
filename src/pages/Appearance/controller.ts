import { config as c } from '@/_configs/appearence.json'
import { logImpl } from '@/platform_impl/log.ts'

const DefaultConfig = c as AppearanceItem[]

/**
 * get a copy of the default appearance config
 */
const getDefaultConfig = () => DefaultConfig.map(item => ({ ...item }))

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
     * current applied value, default to {@link reset}
     */
    value: string
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
        logImpl.info('appearance config synced to storage')
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
            logImpl.info('appearance config restored')
        } else {
            this.#config = getDefaultConfig()
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
        // sync the appearance config to storage
        this.sync()

        // notify all subscribers
        this.#listeners.forEach(listener => listener(this.#config))
    }

    /**
     * modify the specified appearance config,
     * sync to storage and notify all subscribers
     */
    modify(bind: string, to: string) {
        this.#config = this.#config.map((item => {
            if ('bind' in item && item.bind === bind) {
                item.value = to
                document.documentElement.style.setProperty(bind, to)
            }

            return item
        }))
        this.afterChange()
    }

    reset() {
        this.#config = getDefaultConfig()
        this.#config.forEach(item => {
            if ('bind' in item) {
                document.documentElement.style.setProperty(item.bind, item.reset)
            }
        })
        this.afterChange()
    }
}

const appearanceController = new Appearance()

export {
    appearanceController
}