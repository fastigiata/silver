import { Store } from '@tauri-apps/plugin-store'
import { Env } from './env.ts'

/**
 * Marks a value as serializable.
 */
type Serializable = unknown

interface Box {
    clear(): Promise<void>

    contains(key: string): Promise<boolean>

    get<T extends Serializable>(key: string): Promise<T | null>

    remove(key: string): Promise<void>;

    save(): Promise<void>

    set(key: string, value: Serializable): Promise<void>
}

class WebBox implements Box {
    async clear(): Promise<void> {
        window.localStorage.clear()
    }

    async contains(key: string): Promise<boolean> {
        return window.localStorage.getItem(key) !== null
    }

    async get<T>(key: string): Promise<T | null> {
        const raw = window.localStorage.getItem(key)
        return raw === null ? null : JSON.parse(raw)
    }

    async remove(key: string): Promise<void> {
        window.localStorage.removeItem(key)
    }

    async save(): Promise<void> {
        // no-op
    }

    async set(key: string, value: Serializable): Promise<void> {
        window.localStorage.setItem(key, JSON.stringify(value))
    }
}

class EmbedBox implements Box {
    #store: Store

    constructor() {
        this.#store = new Store('sticker.store')
    }

    clear(): Promise<void> {
        return this.#store.clear()
    }

    contains(key: string): Promise<boolean> {
        return this.#store.has(key)
    }

    get<T extends Serializable>(key: string): Promise<T | null> {
        return this.#store.get<T>(key)
    }

    async remove(key: string): Promise<void> {
        await this.#store.delete(key)
    }

    save(): Promise<void> {
        return this.#store.save()
    }

    set(key: string, value: Serializable): Promise<void> {
        return this.#store.set(key, value)
    }
}

const storage = Env.isEmbed ? new EmbedBox() : new WebBox()

export {
    storage
}