import type { ICollection } from '@/_types/collection.ts'
import type { ISticker } from '@/_types/sticker.ts'
import dayjs from 'dayjs'
import { enc } from 'crypto-js'
import SHA1 from 'crypto-js/sha1'
import { stringify as stringifyYaml, parse as parseYaml } from 'yaml'
import { stringify as stringifyToml, parse as parseToml } from 'iarna-toml-esm'

const SUPPORTED_FORMATS = new Set<string>([ 'toml', 'json', 'yaml' ])

enum FileType {
    toml = 'application/toml;charset=utf-8',
    json = 'application/json;charset=utf-8',
    yaml = 'application/x-yaml;charset=utf-8',
}

type FileParseResult = {
    /**
     * 文件是否有效 (长度足够且format有效)
     */
    valid: boolean
    /**
     * 文件格式, 从文件头中解析
     */
    format: string
    /**
     * 文件头中的校验码
     */
    checksum: string
    /**
     * 文件内容
     */
    content: string
    /**
     * 计算出的校验码
     */
    hash: string
    /**
     * 解析出的内容
     *
     * - 当校验码不匹配时为 null
     * - 当校验码匹配时为解析出的内容
     */
    parsed: {
        collections: ICollection[]
        stickers: ISticker[]
    } | null
}

/**
 * 自定义文件头
 *
 * - 106 字符 -- 固定说明 (105 + 1)
 * - 16 字符 -- 格式说明 (11 + 4 + 1)
 * - 56 字符 -- SHA1 哈希值 (15 + 40 + 1)
 */
const buildFileHeader = (format: string, hash: string): string => {
    return `# This file is exported from XxNote with self check. Manual changes might be lost - proceed with caution!
# Format = ${format}
# Check Code = ${hash}`
}

/**
 * 下载文件为指定格式
 */
function download(filename: string, content: string, mime: FileType) {
    const url = URL.createObjectURL(new Blob([ content ], { type: mime }))

    const anchor = document.createElement('a')
    anchor.download = filename
    anchor.href = url
    anchor.click()

    URL.revokeObjectURL(url)
}

function gen_toml(collections: ICollection[], stickers: ISticker[]) {
    const now = dayjs().format('YYYYMMDDHHmm')
    const raw = stringifyToml({ collections, stickers })
    const hash = enc.Hex.stringify(SHA1(raw))
    const header = buildFileHeader('toml', hash)
    download(`XxNote_${now}.toml`, `${header}\n${raw}`, FileType.toml)
}

function gen_json(collections: ICollection[], stickers: ISticker[]) {
    const now = dayjs().format('YYYYMMDDHHmm')
    const raw = JSON.stringify({ collections, stickers }, null, 2)
    const hash = enc.Hex.stringify(SHA1(raw))
    const header = buildFileHeader('json', hash)
    download(`XxNote_${now}.json`, `${header}\n${raw}`, FileType.json)
}

function gen_yaml(collections: ICollection[], stickers: ISticker[]) {
    const now = dayjs().format('YYYYMMDDHHmm')
    const raw = stringifyYaml({ collections, stickers }, { indent: 2 })
    const hash = enc.Hex.stringify(SHA1(raw))
    const header = buildFileHeader('yaml', hash)
    download(`XxNote_${now}.yaml`, `${header}\n${raw}`, FileType.yaml)
}

const parseContent = (content: string, format: string): FileParseResult['parsed'] => {
    switch (format) {
        case 'toml':
            return parseToml(content)
        case 'json':
            return JSON.parse(content)
        case 'yaml':
            return parseYaml(content)
        default:
            return null
    }
}

abstract class IOImpl {
    /**
     * 批量导入, 返回解析结果
     */
    static batchImport(raw: string): FileParseResult {
        if (raw.length < 178) {
            return { valid: false, format: '', checksum: '', content: '', hash: '', parsed: null }
        }

        const format = raw.slice(117, 121)
        const checksum = raw.slice(137, 177)
        const content = raw.slice(178)
        const hash = enc.Hex.stringify(SHA1(content))

        if (checksum !== hash) {
            return { valid: SUPPORTED_FORMATS.has(format), format, checksum, content, hash, parsed: null }
        }

        return { valid: true, format, checksum, content, hash, parsed: parseContent(content, format) }
    }

    /**
     * 批量导出, 按照指定格式触发文件下载
     */
    static batchExport(type: FileType, collections: ICollection[], stickers: ISticker[]) {
        switch (type) {
            case FileType.toml:
                gen_toml(collections, stickers)
                break
            case FileType.json:
                gen_json(collections, stickers)
                break
            case FileType.yaml:
                gen_yaml(collections, stickers)
                break
            default:
                return
        }
    }
}

export {
    FileType,
    IOImpl,
}