type AlarmConfig = {
    /**
     * Whether the notification has been sent
     */
    alarmed: boolean
    /**
     * Expire time in milliseconds
     */
    expire: number
}

type PinConfig = {
    /**
     * `innerSize` of the window
     */
    size: [ number, number ]
    /**
     * `innerPosition` of the window
     */
    position: [ number, number ]
}

/**
 * A record is a single piece of sticky note
 */
type StickerRecord = {
    /**
     * The id of the record
     */
    id: string
    /**
     * The title of the record
     */
    title: string
    /**
     * The content of the record
     */
    content: string
    /**
     * Config of the alarm section
     */
    alarm?: AlarmConfig
    /**
     * Config of the pin section
     */
    pin?: PinConfig
}

/**
 * A collection is a group of records
 */
type StickerCollection = {
    id: string
    name: string
    desc: string
    records: StickerRecord[]
}

export type {
    AlarmConfig,
    PinConfig,
    StickerRecord,
    StickerCollection
}