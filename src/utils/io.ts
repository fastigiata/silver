import type { ICollection } from '@/_types/collection.ts'
import type { ISticker } from '@/_types/sticker.ts'
import dayjs from 'dayjs'

enum FileType {
    text = 'text/plain;charset=utf-8',
    json = 'application/json;charset=utf-8',
    yaml = 'application/x-yaml;charset=utf-8',
}

const getFilename = (mime: FileType): string => {
    const now = dayjs().format('YYYYMMDDHHmm')
    switch (mime) {
        case FileType.text:
            return `${now}.txt`
        case FileType.json:
            return `${now}.json`
        case FileType.yaml:
            return `${now}.yaml`
        default:
            return now
    }
}

const getFileHeader = (hash: string): string => {
    return `# This file is exported from XxNote with self check.
# Manual changes might be lost - proceed with caution!
# Check Code = ${hash}`
}

abstract class IOImpl {
    private static download(filename: string, content: string, mime: FileType) {
        const url = URL.createObjectURL(new Blob([ content ], { type: mime }))

        const anchor = document.createElement('a')
        anchor.download = filename
        anchor.href = url
        anchor.click()

        URL.revokeObjectURL(url)
    }

    static batchExport(type: FileType, collections: ICollection[], stickers: ISticker[]) {
        const filename = getFilename(type)
        const pack = JSON.stringify({ collections, stickers }, null, 2)

        // TODO: calculate the hash of the pack, then add it to the header
    }
}

export {
    IOImpl
}