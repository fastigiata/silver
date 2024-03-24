const sleep = (ms: number) => new Promise<null>((resolve) => setTimeout(() => resolve(null), ms))

/**
 * 格式化到n个字符内
 */
const formatToN = (str: string, n: number) => {
    if (n < 3) throw new Error('n must be greater than 3')
    return str.length <= n ? str : `${str.slice(0, n)}...`
}

const _fallback = (): Promise<File | null> => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json,.yaml,.toml'
    const promise = new Promise<File | null>((resolve) => {
        input.onchange = () => {
            const file = input.files?.[0]
            resolve(file || null)
        }
    })
    input.click()
    return promise
}

const getArchiveFile = async (): Promise<File | null> => {
    if (!('showOpenFilePicker' in window)) return _fallback()

    try {
        // @ts-expect-error ...
        const handler: FileSystemFileHandle[] = await window.showOpenFilePicker({
            types: [
                {
                    description: 'Archive Files',
                    accept: {
                        'application/json': [ '.json' ],
                        'text/yaml': [ '.yaml' ],
                        'text/toml': [ '.toml' ]
                    }
                }
            ]
        })
        return handler[0]!.getFile()
    } catch (_) {
        console.log(_)
        return null
    }
}

export {
    sleep,
    formatToN,
    getArchiveFile,
}